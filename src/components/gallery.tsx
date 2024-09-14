'use client'


import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Lightbox from './lightbox'
import { IKImage } from "imagekitio-react"
import { motion } from 'framer-motion'
import { navbarLinks } from '@/lib/data'
import Loading from '@/app/loading'

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT

interface ImageData {
    filePath: string
    name: string
    createdAt: string
    loaded: boolean
}

export default function Gallery() {
    const pathname = usePathname()
    const [images, setImages] = useState<ImageData[]>([])
    const [loading, setLoading] = useState(true)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [error, setError] = useState<string | null>(null)

    const currentCategory = navbarLinks.works.find(link => link.link === pathname)?.name.toLowerCase() || ''

    const fetchImages = useCallback(async (category: string) => {
        setLoading(true);
        setImages([]);
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

            const data = await response.json();
            setImages(data.map((img: ImageData) => ({ ...img, loaded: false })));
        } catch (error) {
            console.error('Error fetching images:', error);
            if (error instanceof Error) {
                setError(error.name === 'AbortError' ? 'Cannot Fetch the Images, Pleas check your internet connection.' : error.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (currentCategory) {
            fetchImages(currentCategory);
        }
    }, [currentCategory, fetchImages]);

    const closeLightbox = () => {
        setLightboxOpen(false)
    }

    if (error) {
        return <div className="text-red-500 text-center m-10 h-48">Error: {error}</div>
    }

    return (
        <div className="min-h-screen min-w-screen bg-white">
            {loading && (
                <Loading />
            )}
            <main className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                        <GalleryImage
                            key={image.filePath}
                            image={image}
                            index={index}
                            setCurrentIndex={setCurrentIndex}
                            setLightboxOpen={setLightboxOpen}
                            setLoading={setLoading}
                            setImages={setImages}
                        />
                    ))}
                </div>
            </main>
            {lightboxOpen && (
                <Lightbox
                    images={images.map(img => ({ src: img.filePath, alt: img.name }))}
                    currentIndex={currentIndex}
                    onClose={closeLightbox}
                />
            )}
        </div>
    )
}

interface GalleryImageProps {
    image: ImageData;
    index: number;
    setCurrentIndex: (index: number) => void;
    setLightboxOpen: (open: boolean) => void;
    setLoading: (loading: boolean) => void;
    setImages: React.Dispatch<React.SetStateAction<ImageData[]>>;
}

export function GalleryImage({ image, index, setCurrentIndex, setLightboxOpen, setLoading, setImages }: GalleryImageProps) {
    const handleImageLoad = useCallback(() => {
        setImages(prevImages =>
            prevImages.map((img, i) =>
                i === index ? { ...img, loaded: true } : img
            )
        )
        if (index < 5) {
            setLoading(false)
        }
    }, [index, setImages, setLoading])

    const openLightbox = () => {
        setCurrentIndex(index)
        setLightboxOpen(true)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: image.loaded ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            onClick={openLightbox}
        >
            {!image.loaded && (
                <Loading />
            )}
            <IKImage
                urlEndpoint={urlEndpoint}
                path={image.filePath}
                transformation={[{ height: "400", width: "400" }]}
                lqip={{ active: true }}
                loading="lazy"
                onLoad={handleImageLoad}
                alt={image.name}
                className={image.loaded ? '' : 'invisible'}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            </div>
        </motion.div>
    )
}