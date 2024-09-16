'use client';

import { useState } from 'react';
import { LayoutGrid, ArrowLeft, ArrowRight } from 'lucide-react';
import { IKImage } from 'imagekitio-react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Loading from '@/app/loading';
import { Lens } from './ui/lens';
import { useRouter } from 'next/navigation';

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

export default function Lightbox({ images, currentIndex, onClose, pathname }: any) {
    const [imageLoading, setImageLoading] = useState(true);
    const [hovering, setHovering] = useState(false);
    const router = useRouter();

    return (
        <div
            className="fixed inset-0 bg-white flex items-center justify-center z-50"
            onClick={onClose}
        >
            {imageLoading && <Loading />}
            <div
                className="fixed flex max-h-full p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <Swiper
                    initialSlide={currentIndex}
                    modules={[Autoplay, Keyboard, Pagination, Navigation]}
                    className="relative w-screen h-[80dvh]"
                    onSlideChange={(swiper) => {
                        setImageLoading(true);
                        // Update the URL when slide changes
                        const imageHash = images[swiper.activeIndex].hash;
                        if (typeof window !== 'undefined') {
                            router.replace(`${pathname}/${imageHash}`);
                        }
                    }}
                >
                    {images.map((image: { src: string; alt: string; id: string; hash: string }, index: number) => (
                        <Lens key={index} hovering={hovering} setHovering={setHovering}>
                            <SwiperSlide className="relative">
                                <IKImage
                                    urlEndpoint={urlEndpoint}
                                    lqip={{ active: true }}
                                    loading="lazy"
                                    path={image.src}
                                    alt={image.alt}
                                    className="object-contain h-full w-full"
                                    onLoad={() => setImageLoading(false)}
                                />
                            </SwiperSlide>
                        </Lens>
                    ))}
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
                </Swiper>
            </div>
        </div>
    );
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
