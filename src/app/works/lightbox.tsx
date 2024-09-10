'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, ArrowBigLeft, ArrowLeft, ArrowRight, Grid, LayoutGrid } from 'lucide-react'
import { IKImage } from 'imagekitio-next'

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

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
            className="fixed inset-0 bg-white flex items-center justify-center z-50"
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
                    <IKImage priority urlEndpoint={urlEndpoint} lqip={{ active: true }} loading="lazy" path={images[imageIndex].src} fill alt={images[imageIndex].alt} className="object-contain" />
                    {/* <Image
                        src={images[imageIndex].src}
                        alt={images[imageIndex].alt}
                        fill
                        className="object-contain"
                        priority
                    /> */}
                    <div className='w-full flex gap-2 justify-center absolute -bottom-10 '>
                        <button
                            onClick={handlePrev}
                            className='text-zinc-400 hover:text-zinc-800 duration-300'
                        >
                            <ArrowLeft size={16} />
                            <span className="sr-only">Previous</span>
                        </button>
                        <button
                            onClick={onClose}
                            className='text-zinc-400 hover:text-zinc-800 duration-300'
                        >
                            <LayoutGrid size={16} />
                            <span className="sr-only">Close</span>
                        </button>
                        <button
                            onClick={handleNext}
                            className='text-zinc-400 hover:text-zinc-800 duration-300'
                        >
                            <ArrowRight size={16} />
                            <span className="sr-only">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}