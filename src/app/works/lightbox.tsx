'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, ArrowBigLeft, ArrowLeft, ArrowRight, Grid, LayoutGrid } from 'lucide-react'

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: any) {
    const [imageIndex, setImageIndex] = useState(currentIndex)

    const handlePrev = () => {
        const newIndex = (imageIndex - 1 + images.length) % images.length
        setImageIndex(newIndex)
        onPrev(newIndex)
    }

    const handleNext = () => {
        const newIndex = (imageIndex + 1) % images.length
        setImageIndex(newIndex)
        onNext(newIndex)
    }

    return (
        <div
            className="fixed inset-0 bg-zinc-200 flex items-center justify-center z-50"
            onClick={onClose}
        >

            <div
                className="fixed flex max-h-full p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`relative w-screen`}
                    style={{ width: '120dvh', height: '80vh' }}
                >
                    <Image
                        src={images[imageIndex].src}
                        alt={images[imageIndex].alt}
                        fill
                        className="object-contain"
                        priority
                    />
                    <button
                        className="absolute left-[44%] -bottom-12 transform p-2"
                        onClick={handlePrev}
                    >
                        <ArrowLeft size={24} />
                        <span className="sr-only">Previous</span>
                    </button>
                    <button
                        className="absolute right-[43%] -bottom-12 transform p-2"
                        onClick={handleNext}
                    >
                        <ArrowRight size={24} />
                        <span className="sr-only">Next</span>
                    </button>
                    <button
                        className="absolute right-[47%] -bottom-12 text-zinc-800 hover:text-gray-600 p-2 transition-colors duration-200"
                        onClick={onClose}
                    >
                        <LayoutGrid size={24} />
                        <span className="sr-only">Close</span>
                    </button>
                </div>
            </div>
        </div>
    )
}