// app/works/[category]/layout.tsx

'use client';

import { useEffect, useState, useCallback, createContext, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowLeftCircle, LayoutGrid } from 'lucide-react';

interface ImageData {
    id: string;
    filePath: string;
    name: string;
    createdAt: string;
    hash: string;
}

interface ImageContextType {
    images: ImageData[];
    currentIndex: number;
    error: string | null;
}

export const ImageContext = createContext<ImageContextType | null>(null);

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const params = useParams();
    const { category, param: hash } = params;
    const [images, setImages] = useState<ImageData[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    // Fetch images for the category
    const fetchImages = useCallback(async () => {
        try {
            const response = await fetch(`/api/images?category=${category}&limit=1000`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch images');
            }
            const data = await response.json();
            const imagesData = data.images.map((image: any) => ({
                id: image.fileId,
                filePath: image.filePath,
                name: image.name,
                createdAt: image.createdAt,
                hash: image.hash,
            }));
            setImages(imagesData);
        } catch (err: any) {
            console.error('Error fetching images:', err);
            setError(err.message || 'An unknown error occurred');
        }
    }, [category]);

    // Initial fetch of images
    useEffect(() => {
        if (category) {
            fetchImages();
        }
    }, [fetchImages]);

    // Update currentIndex when images or hash change
    useEffect(() => {
        if (images.length > 0 && hash) {
            const index = images.findIndex((image) => image.hash === hash);
            if (index !== -1) {
                setCurrentIndex(index);
            } else {
                setError('Image not found.');
            }
        }
    }, [images, hash]);

    const handleClose = () => {
        router.push(`/works/${category}`);
    };

    const handlePrev = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        const newHash = images[newIndex].hash;
        router.replace(`/works/${category}/${newHash}`);
        setCurrentIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % images.length;
        const newHash = images[newIndex].hash;
        router.replace(`/works/${category}/${newHash}`);
        setCurrentIndex(newIndex);
    };


    return (
        <ImageContext.Provider value={{ images, currentIndex, error }}>
            <div
                className="fixed inset-0 overflow-hidden bg-white flex items-center justify-center z-50"
                onClick={handleClose}
            >
                <div
                    className="fixed flex max-h-full p-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative flex items-center justify-center">
                        {/* Buttons */}
                        <div className='w-full flex gap-6 md:gap-2 justify-center fixed md:bottom-10 bottom-2 z-10'>
                            {hash && (
                                <>
                                    {/* Desktop */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePrev();
                                        }}
                                        className="hidden md:block text-zinc-400  hover:text-zinc-800 duration-300"
                                    >
                                        <ArrowLeft size={16} />
                                        <span className="sr-only">Previous</span>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClose();
                                        }}
                                        className="hidden md:block text-zinc-400 hover:text-zinc-800 duration-300"
                                    >
                                        <LayoutGrid size={16} />
                                        <span className="sr-only">Close</span>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleNext();
                                        }}
                                        className="hidden md:block text-zinc-400 hover:text-zinc-800 duration-300"
                                    >
                                        <ArrowRight size={16} />
                                        <span className="sr-only">Next</span>
                                    </button>

                                    {/* Mobile */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePrev();
                                        }}
                                        className="block md:hidden text-zinc-400  hover:text-zinc-800 duration-300"
                                    >
                                        <ArrowLeft size={26} />
                                        <span className="sr-only">Previous</span>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClose();
                                        }}
                                        className="block md:hidden text-zinc-400 hover:text-zinc-800 duration-300"
                                    >
                                        <LayoutGrid size={26} />
                                        <span className="sr-only">Close</span>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleNext();
                                        }}
                                        className="block md:hidden text-zinc-400 hover:text-zinc-800 duration-300"
                                    >
                                        <ArrowRight size={26} />
                                        <span className="sr-only">Next</span>
                                    </button>
                                </>
                            )}

                        </div>
                        <div className='w-[100dvw]'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </ImageContext.Provider>
    );
}
