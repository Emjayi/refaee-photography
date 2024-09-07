'use client'
import Image from 'next/image'
import { SetStateAction, useState } from 'react'
import Lightbox from './lightbox'

const images = [
    { src: '/bg/01.jpg', alt: 'Image 1', name: 'Sunset Beach' },
    { src: '/bg/02.jpg', alt: 'Image 2', name: 'Mountain Vista' },
    { src: '/bg/03.jpg', alt: 'Image 3', name: 'City Lights' },
    { src: '/bg/04.jpg', alt: 'Image 4', name: 'Forest Path' },
    { src: '/bg/05.jpg', alt: 'Image 5', name: 'Desert Dunes' },
    { src: '/bg/06.jpg', alt: 'Image 6', name: 'Ocean Waves' },
    { src: '/bg/01.jpg', alt: 'Image 1', name: 'Sunset Beach' },
    { src: '/bg/02.jpg', alt: 'Image 2', name: 'Mountain Vista' },
    { src: '/bg/03.jpg', alt: 'Image 3', name: 'City Lights' },
    { src: '/bg/04.jpg', alt: 'Image 4', name: 'Forest Path' },
    { src: '/bg/05.jpg', alt: 'Image 5', name: 'Desert Dunes' },
    { src: '/bg/06.jpg', alt: 'Image 6', name: 'Ocean Waves' },
    { src: '/bg/01.jpg', alt: 'Image 1', name: 'Sunset Beach' },
    { src: '/bg/02.jpg', alt: 'Image 2', name: 'Mountain Vista' },
    { src: '/bg/03.jpg', alt: 'Image 3', name: 'City Lights' },
    { src: '/bg/04.jpg', alt: 'Image 4', name: 'Forest Path' },
    { src: '/bg/05.jpg', alt: 'Image 5', name: 'Desert Dunes' },
    { src: '/bg/06.jpg', alt: 'Image 6', name: 'Ocean Waves' },
]
export default function Gallery() {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)

    const openLightbox = (image: any) => {
        setSelectedImage(image)
        setLightboxOpen(true)
    }

    return (
        <div className="min-h-screen min-w-screen bg-zinc-300">
            <main className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-lg cursor-pointer group"
                            onClick={() => openLightbox(image)}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={720}
                                height={480}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white text-lg font-semibold">{image.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            {lightboxOpen && (
                <Lightbox images={images} image={selectedImage} onClose={() => setLightboxOpen(false)} />
            )}
        </div>
    )
}