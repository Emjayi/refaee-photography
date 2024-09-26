'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowLeft, ArrowRight, LayoutGrid, Share2 } from 'lucide-react'
import { IKImage } from 'imagekitio-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Loading from '@/app/loading'
import { Lens } from './ui/lens'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ''

interface LightboxProps {
    images: { src: string; alt: string }[]
    currentIndex: number
    onClose: () => void
}

export default function Lightbox({ images, currentIndex, onClose }: LightboxProps) {
    const [currentSlide, setCurrentSlide] = useState(currentIndex)
    const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set())
    const swiperRef = useRef<any>(null)
    const path = usePathname()
    const router = useRouter()

    // Close Lightbox on Escape key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    // Handle slide change and update URL
    const handleSlideChange = useCallback((swiper: any) => {
        setCurrentSlide(swiper.realIndex)
        // Update URL with new image index
        router.push(`${path}?image=${swiper.realIndex}`)
    }, [router])

    // Handle image load
    const handleImageLoad = useCallback((index: number) => {
        setLoadedSlides(prev => new Set(prev).add(index))
    }, [])

    // Handle Next Slide
    const handleNext = useCallback(() => {
        if (swiperRef.current) {
            swiperRef.current.slideNext()
        }
    }, [])

    // Handle Previous Slide
    const handlePrev = useCallback(() => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev()
        }
    }, [])

    return (
        <div
            className="fixed inset-0 bg-white flex items-center justify-center z-50"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
        >
            <motion.div
                className="fixed flex max-h-full p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <Swiper
                    initialSlide={currentSlide}
                    onSlideChange={handleSlideChange}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    modules={[Autoplay, Keyboard, Pagination, Navigation]}
                    className="relative w-screen h-[80dvh]"
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    keyboard={{
                        enabled: true,
                    }}
                    navigation={false} // Using custom navigation
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-full flex items-center justify-center">
                                {!loadedSlides.has(index) && currentSlide !== index && <Loading />}
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5, delay: .4 }}
                                    className={`object-contain w-[60%] h-full flex items-center justify-center`}>
                                    <IKImage
                                        urlEndpoint={urlEndpoint}
                                        lqip={{ active: true }}
                                        loading="lazy"
                                        path={image.src}
                                        alt={image.alt}
                                        onLoad={() => handleImageLoad(index)}
                                        onError={() => handleImageLoad(index)} // Handle image load errors
                                    />
                                </motion.div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            {/* Custom Navigation and Share Buttons */}
            <div className='w-full flex gap-2 justify-center fixed bottom-10 z-10'>
                <button
                    onClick={handlePrev}
                    className='text-zinc-400 hover:text-zinc-800 duration-300 hidden lg:block'
                    aria-label="Previous Slide"
                >
                    <ArrowLeft size={16} />
                    <span className="sr-only">Previous</span>
                </button>
                <button
                    onClick={onClose}
                    className='text-zinc-400 hover:text-zinc-800 duration-300 hidden lg:flex items-center gap-1 '
                    aria-label="Close Lightbox"
                >
                    <LayoutGrid size={16} />
                    <span className="sr-only">Close</span>
                </button>
                <button
                    onClick={onClose}
                    className='text-zinc-400 hover:text-zinc-800 duration-300 flex lg:hidden items-center gap-1 '
                    aria-label="Close Lightbox"
                >
                    <LayoutGrid size={36} />
                    <span className="sr-only">Close</span>
                </button>
                <button
                    onClick={handleNext}
                    className='text-zinc-400 hover:text-zinc-800 duration-300 hidden lg:block'
                    aria-label="Next Slide"
                >
                    <ArrowRight size={16} />
                    <span className="sr-only">Next</span>
                </button>
            </div>
        </div >
    )
}
