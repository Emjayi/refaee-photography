'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lightbox from './lightbox'
import { IKImage } from "imagekitio-react"
import { motion, AnimatePresence } from 'framer-motion'
import { navbarLinks } from '@/lib/data'
import Loading from '@/app/loading'
import React from 'react'

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT

interface ImageData {
    filePath: string
    name: string
    createdAt: string
}

export default function Gallery() {
    const pathname = usePathname()
    const [images, setImages] = useState<ImageData[]>([])
    const [loadedImages, setLoadedImages] = useState<number[]>([])
    const [loading, setLoading] = useState(true)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const isMounted = useRef(true)

    const currentCategory = navbarLinks.works.find(link => link.link === pathname)?.name.toLowerCase() || ''

    const fetchImages = useCallback(async (category: string) => {
        setLoading(true);
        setImages([]);
        setLoadedImages([]);
        setError(null);

        const timeoutDuration = 10000; // 10 seconds
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

        try {
            const response = await fetch(`/api/images?category=${category}`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch images');
            }

            const data: ImageData[] = await response.json();
            if (isMounted.current) {
                setImages(data);
            }
        } catch (error: any) {
            console.error('Error fetching images:', error);
            if (isMounted.current) {
                setError(error.name === 'AbortError'
                    ? 'Cannot load the images. Please check your internet connection or simply reload the page.'
                    : error.message || 'An unknown error occurred');
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }, [])

    useEffect(() => {
        isMounted.current = true
        if (currentCategory) {
            fetchImages(currentCategory)
        }
        return () => {
            isMounted.current = false
        }
    }, [currentCategory, fetchImages])

    const handleImageLoad = useCallback((index: number) => {
        setLoadedImages(prev => [...prev, index])
    }, [])

    const openLightbox = useCallback((index: number) => {
        setCurrentIndex(index)
        setLightboxOpen(true)
    }, [])

    const closeLightbox = () => {
        setLightboxOpen(false)
    }

    if (error) {
        return <div className="text-red-500 text-center m-10 h-48 flex items-center justify-center">Error: {error}</div>
    }

    return (
        <div className="min-h-screen min-w-screen bg-white">
            {loading && (
                <div className="flex items-center justify-center h-48">
                    <Loading />
                </div>
            )}
            <main className={`container mx-auto px-4 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                        <GalleryImage
                            key={image.filePath}
                            image={image}
                            index={index}
                            isLoaded={loadedImages.includes(index)}
                            onLoad={() => handleImageLoad(index)}
                            onClick={() => openLightbox(index)}
                        />
                    ))}
                </div>
            </main>
            <AnimatePresence>
                {lightboxOpen && (
                    <Lightbox
                        images={images.map(img => ({ src: img.filePath, alt: img.name }))}
                        currentIndex={currentIndex}
                        onClose={closeLightbox}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

interface GalleryImageProps {
    image: ImageData;
    index: number;
    isLoaded: boolean;
    onLoad: () => void;
    onClick: () => void;
}

const GalleryImage = React.memo(({ image, index, isLoaded, onLoad, onClick }: GalleryImageProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            onClick={onClick}
            aria-label={`Open image ${image.name} in lightbox`}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter') onClick()
            }}
        >
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <Loading />
                </div>
            )}
            <IKImage
                urlEndpoint={urlEndpoint}
                path={image.filePath}
                transformation={[{ height: "400", width: "400" }]}
                lqip={{ active: true }}
                loading="lazy"
                onLoad={onLoad}
                alt={image.name}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">

            </div>
        </motion.div>
    )
})
