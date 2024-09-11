'use client'
import Image from 'next/image'
import { SetStateAction, useState } from 'react'
import Lightbox from '../../components/lightbox'

const images = [
    { src: '/bg/01.jpg', alt: 'Image 1' },
    { src: '/bg/02.jpg', alt: 'Image 2' },
    { src: '/bg/03.jpg', alt: 'Image 3' },
    { src: '/bg/04.jpg', alt: 'Image 4' },
    { src: '/bg/05.jpg', alt: 'Image 5' },
    { src: '/bg/06.jpg', alt: 'Image 6' },
    { src: '/bg/01.jpg', alt: 'Image 1' },
    { src: '/bg/02.jpg', alt: 'Image 2' },
    { src: '/bg/03.jpg', alt: 'Image 3' },
    { src: '/bg/04.jpg', alt: 'Image 4' },
    { src: '/bg/05.jpg', alt: 'Image 5' },
    { src: '/bg/06.jpg', alt: 'Image 6' },
    { src: '/bg/01.jpg', alt: 'Image 1' },
    { src: '/bg/02.jpg', alt: 'Image 2' },
    { src: '/bg/03.jpg', alt: 'Image 3' },
    { src: '/bg/04.jpg', alt: 'Image 4' },
    { src: '/bg/05.jpg', alt: 'Image 5' },
    { src: '/bg/06.jpg', alt: 'Image 6' },
]
export default function Gallery() {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const openLightbox = (index: number) => {
        setCurrentIndex(index)
        setLightboxOpen(true)
    }

    const handleNext = (newIndex: number) => {
        setCurrentIndex(newIndex)
    }

    const handlePrev = (newIndex: number) => {
        setCurrentIndex(newIndex)
    }

    return (
        <div className="min-h-screen min-w-screen">
            <main className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-lg cursor-pointer group"
                            onClick={() => openLightbox(index)}
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

                            </div>
                        </div>
                    ))}
                </div>
            </main>
            {lightboxOpen && (
                <Lightbox
                    images={images}
                    currentIndex={currentIndex}
                    onClose={() => setLightboxOpen(false)}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}
        </div>
    )
}