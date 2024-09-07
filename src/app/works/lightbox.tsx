'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { X } from 'lucide-react'

export default function Lightbox({ image, onClose }: any) {
    const [isZoomed, setIsZoomed] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const imageRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        const handleEsc = (event: { keyCode: number }) => {
            if (event.keyCode === 27) onClose()
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose])
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (imageRef.current) {
            const { left, top, width, height } = imageRef.current.getBoundingClientRect()
            const x = (e.clientX - left) / width
            const y = (e.clientY - top) / height
            setMousePosition({ x, y })
        }
    }

    const handleImageClick = () => {
        setIsZoomed(!isZoomed)
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
            onMouseMove={handleMouseMove}
        >
            <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
                onClick={onClose}
            >
                <X size={24} />
                <span className="sr-only">Close</span>
            </button>
            <div
                className="fixed flex max-h-full p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`relative w-screen ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                    style={{ width: '100dvh', height: '80vh' }}
                    onClick={handleImageClick}
                >
                    <p className="text-white text-center mt-4 z-[1000]">{image.name}</p>
                    <Image
                        ref={imageRef}
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        style={{
                            transform: isZoomed ? 'scale(2)' : 'scale(1)',
                            transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
                            transition: isZoomed ? 'transform 0.3s ease-out' : 'transform 0.3s ease-out',
                        }}
                        priority
                    />
                </div>
            </div>
        </div>
    )
}