'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lightbox from './lightbox'
import { IKImage } from "imagekitio-react"
import { motion } from 'framer-motion'
import { navbarLinks } from '@/lib/data'

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT

interface ImageData {
    filePath: string
    name: string
    createdAt: string
}

export default function Gallery() {
    const pathname = usePathname()
    const [images, setImages] = useState<ImageData[]>([])
    const [loading, setLoading] = useState(true)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [error, setError] = useState<string | null>(null)

    const currentCategory = navbarLinks.works.find(link => link.link === pathname)?.name.toLowerCase() || ''

    useEffect(() => {
        if (currentCategory) {
            fetchImages(currentCategory)
        }
    }, [currentCategory])

    const fetchImages = async (category: string) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/images?category=${category}`)
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to fetch images')
            }
            const data = await response.json()
            setImages(data)
        } catch (error) {
            console.error('Error fetching images:', error)
            setError(error instanceof Error ? error.message : 'An unknown error occurred')
        } finally {
            setLoading(false)
        }
    }

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
            <main className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {loading
                        ? Array.from({ length: 20 }).map((_, index) => (
                            <div key={index} className="relative overflow-hidden rounded-lg bg-gray-200 animate-pulse" style={{ paddingBottom: '100%' }} />
                        ))
                        : images.map((image, index) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                                key={index}
                                className="relative overflow-hidden rounded-lg cursor-pointer group"
                                onClick={() => openLightbox(index)}
                            >
                                <IKImage
                                    urlEndpoint={urlEndpoint}
                                    path={image.filePath}
                                    transformation={[{ height: "400", width: "400" }]}
                                    lqip={{ active: true }}
                                    loading="lazy"
                                    alt={image.name}
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