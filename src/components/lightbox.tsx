// components/lightbox.tsx

'use client'

import { useState } from 'react'
import { LayoutGrid, ArrowLeft, ArrowRight } from 'lucide-react'
import { IKImage } from 'imagekitio-react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Loading from '@/app/loading'
import { Lens } from './ui/lens'

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT

export default function Lightbox({ images, currentIndex, onClose, pathname }: any) {
    const [imageLoading, setImageLoading] = useState(true)
    const [hovering, setHovering] = useState(false)

    return (
        <div
            className="fixed inset-0 bg-white flex items-center justify-center z-50"
            onClick={onClose}
        >
            {imageLoading && <Loading />}
            <div className="fixed flex max-h-full p-4" onClick={(e) => e.stopPropagation()}>
                <Swiper
                    initialSlide={currentIndex}
                    modules={[Autoplay, Keyboard, Pagination, Navigation]}
                    className="relative w-screen h-[80dvh]"
                    onSlideChange={(swiper) => {
                        setImageLoading(true)
                        // Update the URL hash when slide changes without causing scroll
                        const imageHash = images[swiper.activeIndex].id
                        if (typeof window !== 'undefined') {
                            window.history.replaceState(null, '', `${pathname}#${imageHash}`)
                        }
                    }}
                >
                    {images.map((image: { src: string; alt: string; id: string }, index: number) => (
                        <Lens key={index} hovering={hovering} setHovering={setHovering}>
                            <SwiperSlide className="relative">
                                <IKImage
                                    urlEndpoint={urlEndpoint}
                                    lqip={{ active: true }}
                                    loading="lazy"
                                    path={image.src}
                                    alt={image.alt}
                                    className="object-contain w-full h-full"
                                    onLoad={() => setImageLoading(false)}
                                />
                            </SwiperSlide>
                        </Lens>
                    ))}
                    {images.length > 1 && (
                        <div className="w-full flex gap-2 justify-center fixed bottom-10 z-10">
                            <SlidePrevButton />
                            <button
                                onClick={onClose}
                                className="text-zinc-400 hover:text-zinc-800 duration-300"
                            >
                                <LayoutGrid size={16} />
                                <span className="sr-only">Close</span>
                            </button>
                            <SlideNextButton />
                        </div>
                    )}
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
            className="text-zinc-400  hover:text-zinc-800 duration-300"
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
            className="text-zinc-400 hover:text-zinc-800 duration-300"
        >
            <ArrowLeft size={16} />
            <span className="sr-only">Previous</span>
        </button>
    );
}
