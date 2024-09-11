'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Lightbox from './lightbox'
import { IKImage } from "imagekitio-react"
import { motion } from 'framer-motion'
import { navbarLinks } from '@/lib/data'
import { Loader2 } from 'lucide-react'

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
        setLoading(true)
        setImages([])
        try {
            const response = await fetch(`/api/images?category=${category}`)
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to fetch images')
            }
            const data = await response.json()
            setImages(data.map((img: ImageData) => ({ ...img, loaded: false })))
        } catch (error) {
            console.error('Error fetching images:', error)
            setError(error instanceof Error ? error.message : 'An unknown error occurred')
        }
    }, [])

    useEffect(() => {
        if (currentCategory) {
            fetchImages(currentCategory)
        }
    }, [currentCategory, fetchImages])

    const handleImageLoad = useCallback((index: number) => {
        setImages(prevImages =>
            prevImages.map((img, i) =>
                i === index ? { ...img, loaded: true } : img
            )
        )
        if (index < 5) {
            setLoading(false)
        }
    }, [])

    const openLightbox = (index: number) => {
        setCurrentIndex(index)
        setLightboxOpen(true)
    }

    const closeLightbox = () => {
        setLightboxOpen(false)
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">Error: {error}</div>
    }

    return (
        <div className="min-h-screen min-w-screen bg-white">
            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                </div>
            )}
            <main className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: image.loaded ? 1 : 0 }}
                            transition={{ duration: 0.2 }}
                            key={image.filePath}
                            className="relative overflow-hidden rounded-lg cursor-pointer group"
                            onClick={() => openLightbox(index)}
                        >
                            {!image.loaded && (
                                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                            )}
                            <IKImage
                                urlEndpoint={urlEndpoint}
                                path={image.filePath}
                                transformation={[{ height: "400", width: "400" }]}
                                lqip={{ active: true }}
                                loading="lazy"
                                onLoad={() => handleImageLoad(index)}
                                alt={image.name}
                                className={image.loaded ? '' : 'invisible'}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            </div>
                        </motion.div>
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