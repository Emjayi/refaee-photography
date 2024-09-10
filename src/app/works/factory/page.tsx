'use client'
import Image from 'next/image'
import { useState } from 'react'
import Lightbox from '../lightbox'
import { IKImage } from "imagekitio-next";

const urlEndpoint = "https://ik.imagekit.io/emjayi/";

export default function Gallery() {
    const [limit, setLimit] = useState(200)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const images = Array.from({ length: limit }, (_, i) => ({
        src: `factory/${i + 1}.jpg`,
        alt: `Factory Image ${i + 1}`,
    }));
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
        <div className="min-h-screen min-w-screen bg-white">
            <main className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-lg cursor-pointer group"
                            onClick={() => openLightbox(index)}
                        >
                            <IKImage urlEndpoint={urlEndpoint} lqip={{ active: true }} loading="lazy" path={`${image.src}`} onError={() => setLimit(index)} width={400} height={400} alt={image.alt} />
                            {/* <Image
                                src={image.src}
                                alt={image.alt}
                                width={720}
                                height={480}
                                className="object-cover w-full h-[240px] transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            /> */}
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