// components/gallery.tsx

'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Lightbox from './lightbox'
import { IKImage } from 'imagekitio-react'
import { motion, AnimatePresence } from 'framer-motion'
import { navbarLinks } from '@/lib/data'
import Loading from '@/app/loading'
import { useInView } from 'react-intersection-observer'

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT

interface ImageData {
    id: string
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
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [targetImage, setTargetImage] = useState<ImageData | null>(null)

    const currentCategory =
        navbarLinks.works.find((link) => link.link === pathname)?.name.toLowerCase() || ''

    const { ref, inView } = useInView({
        threshold: 0,
    })

    const fetchImages = useCallback(
        async (category: string, pageNum: number) => {
            if (!hasMore) return
            setError(null)

            try {
                const response = await fetch(
                    `/api/images?category=${category}&page=${pageNum}&limit=10`
                )

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || 'Failed to fetch images')
                }

                const data = await response.json()
                setImages((prev) => [...prev, ...data.images])
                setHasMore(data.hasMore)
                setPage((prev) => prev + 1)
            } catch (error: any) {
                console.error('Error fetching images:', error)
                setError(error.message || 'An unknown error occurred')
            } finally {
                setLoading(false)
            }
        },
        [hasMore]
    )

    const fetchTargetImage = useCallback(async (id: string) => {
        try {
            const response = await fetch(`/api/image?id=${id}`)
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to fetch target image')
            }
            const data = await response.json()
            setTargetImage(data.image)
            setLightboxOpen(true)
        } catch (error: any) {
            console.error('Error fetching target image:', error)
            setError(error.message || 'An unknown error occurred')
        }
    }, [])

    useEffect(() => {
        if (currentCategory) {
            setImages([])
            setPage(1)
            setHasMore(true)
            setError(null)
            fetchImages(currentCategory, 1)
        }
    }, [currentCategory, fetchImages])

    useEffect(() => {
        if (inView && !loading) {
            fetchImages(currentCategory, page)
        }
    }, [inView, loading, fetchImages, currentCategory, page])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash.substring(1)
            if (hash) {
                fetchTargetImage(hash)
            }
        }
    }, [fetchTargetImage])

    const handleImageLoad = useCallback((index: number) => {
        setLoadedImages((prev) => [...prev, index])
    }, [])

    const openLightbox = useCallback(
        (index: number) => {
            setCurrentIndex(index)
            setLightboxOpen(true)
            const imageHash = images[index].id
            if (typeof window !== 'undefined') {
                window.history.replaceState(null, '', `${pathname}#${imageHash}`)
            }
        },
        [images, pathname]
    )

    const closeLightbox = () => {
        setLightboxOpen(false)
        setTargetImage(null)
        if (typeof window !== 'undefined') {
            window.history.replaceState(null, '', pathname)
        }
    }

    // Handle hash changes
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1)
            if (hash) {
                const index = images.findIndex((image) => image.id === hash)
                if (index !== -1) {
                    setCurrentIndex(index)
                    setLightboxOpen(true)
                } else {
                    fetchTargetImage(hash)
                }
            } else {
                closeLightbox()
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('hashchange', handleHashChange)
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('hashchange', handleHashChange)
            }
        }
    }, [images, fetchTargetImage])

    if (error) {
        return (
            <div className="text-red-500 text-center m-10 h-[60vh] flex items-center justify-center">
                {error}
            </div>
        )
    }

    return (
        <div className="min-h-screen min-w-screen bg-white">
            <main
                className={`container mx-auto px-4 transition-opacity duration-500 ${loading && images.length === 0 ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                        <GalleryImage
                            key={image.id}
                            image={image}
                            index={index}
                            isLoaded={loadedImages.includes(index)}
                            onLoad={() => handleImageLoad(index)}
                            onClick={() => openLightbox(index)}
                        />
                    ))}
                </div>
                {loading && (
                    <div className="flex items-center justify-center h-48">
                        <Loading />
                    </div>
                )}
                <div ref={ref} style={{ height: '10px' }} />
            </main>
            <AnimatePresence>
                {lightboxOpen && (
                    <Lightbox
                        images={
                            targetImage
                                ? [{ src: targetImage.filePath, alt: targetImage.name, id: targetImage.id }]
                                : images.map((img) => ({ src: img.filePath, alt: img.name, id: img.id }))
                        }
                        currentIndex={targetImage ? 0 : currentIndex}
                        onClose={closeLightbox}
                        pathname={pathname}
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

const GalleryImage = ({ image, index, isLoaded, onLoad, onClick }: GalleryImageProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.25, delay: index * 0.05 }}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            onClick={onClick}
            aria-label={`Open image ${image.name} in lightbox`}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter') onClick();
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
                transformation={[{ height: '400', width: '400' }]}
                lqip={{ active: true }}
                loading="lazy"
                onLoad={onLoad}
                alt={image.name}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {/* Optional overlay content */}
            </div>
        </motion.div>
    );
};
