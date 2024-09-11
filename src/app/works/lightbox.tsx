'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, ArrowBigLeft, ArrowLeft, ArrowRight, Grid, LayoutGrid } from 'lucide-react'
import { IKImage } from 'imagekitio-next'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/navigation'

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function Lightbox({ images, currentIndex, onClose }: any) {
    const [imageIndex, setImageIndex] = useState(currentIndex)

    return (
        <div
            className="fixed inset-0 bg-white flex items-center justify-center z-50"
            onClick={onClose}
        >

            <div
                className="fixed flex max-h-full p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <Swiper
                    initialSlide={imageIndex}
                    modules={[Autoplay, Keyboard, Pagination, Navigation]}
                    className={`relative w-screen h-[80dvh]`}
                >
                    {images.map((image: { src: string; alt: string }, index: number) => (
                        <SwiperSlide key={index}>
                            <IKImage
                                priority
                                urlEndpoint={urlEndpoint}
                                lqip={{ active: true }}
                                loading="lazy"
                                path={image.src}
                                fill
                                quality={100}
                                alt={image.alt}
                                className="object-contain"
                            />
                        </SwiperSlide>
                    ))}
                    <div className='w-full flex gap-2 justify-center fixed bottom-10 z-10'>
                        <SlidePrevButton />
                        <button
                            onClick={onClose}
                            className='text-zinc-400 hover:text-zinc-800 duration-300'
                        >
                            <LayoutGrid size={16} />
                            <span className="sr-only">Close</span>
                        </button>
                        <SlideNextButton />
                    </div>
                </Swiper>
            </div>
        </div>
    )
}

function SlideNextButton() {
    const swiper = useSwiper();

    return (
        <button
            onClick={() => swiper.slideNext()}
            className='text-zinc-400  hover:text-zinc-800 duration-300'
        >
            <ArrowRight size={16} />
            <span className="sr-only">Next</span>
        </button>
    );
}
function SlidePrevButton() {
    const swiper = useSwiper();

    return (
        <button
            onClick={() => swiper.slidePrev()}
            className='text-zinc-400 hover:text-zinc-800 duration-300'
        >
            <ArrowLeft size={16} />
            <span className="sr-only">Previous</span>
        </button>
    );
}