'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IKImage } from 'imagekitio-react';
import { motion } from 'framer-motion';
import { navbarLinks } from '@/lib/data';
import Loading from '@/app/loading';
import { useImageCache } from '@/contexts/ImageCacheContext';

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

interface ImageData {
    id: string;
    filePath: string;
    name: string;
    createdAt: string;
    hash: string;
}

export default function Gallery() {
    const pathname = usePathname();
    const router = useRouter();
    const [images, setImages] = useState<ImageData[]>([]);
    const [loadedImages, setLoadedImages] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { cache, setCache } = useImageCache();

    const currentCategory =
        navbarLinks.works.find((link) => link.link === pathname)?.name.toLowerCase() || '';

    useEffect(() => {
        if (!currentCategory) return;

        if (cache[currentCategory]) {
            // Use cached images
            setImages(cache[currentCategory]);
            setLoading(false);
        } else {
            // Fetch images and cache them
            const fetchImages = async () => {
                setError(null);
                setLoading(true);

                try {
                    const response = await fetch(`/api/images?category=${currentCategory}&limit=1000`);
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to fetch images');
                    }
                    const data = await response.json();

                    const fetchedImages = data.images.map((image: any) => ({
                        id: image.fileId,
                        filePath: image.filePath,
                        name: image.name,
                        createdAt: image.createdAt,
                        hash: image.hash,
                    }));

                    setImages(fetchedImages);
                    setCache((prevCache) => ({
                        ...prevCache,
                        [currentCategory]: fetchedImages,
                    }));
                } catch (error: any) {
                    console.error('Error fetching images:', error);
                    setError(error.message || 'An unknown error occurred');
                } finally {
                    setLoading(false);
                }
            };

            fetchImages();
        }
    }, [currentCategory, cache, setCache]);

    const fetchImages = useCallback(
        async (category: string) => {
            setError(null);
            setLoading(true);

            try {
                const response = await fetch(`/api/images?category=${category}&limit=1000`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch images');
                }
                const data = await response.json();

                const uniqueImages = data.images.map((image: any) => ({
                    id: image.fileId,
                    filePath: image.filePath,
                    name: image.name,
                    createdAt: image.createdAt,
                    hash: image.hash,
                }));

                setImages(uniqueImages);
            } catch (error: any) {
                console.error('Error fetching images:', error);
                setError(error.message || 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        if (currentCategory) {
            setImages([]);
            setError(null);
            fetchImages(currentCategory);
        }
    }, [currentCategory, fetchImages]);

    const handleImageLoad = useCallback((index: number) => {
        setLoadedImages((prev) => [...prev, index]);
    }, []);

    const openImagePage = useCallback(
        (index: number) => {
            const imageHash = images[index].hash;
            router.push(`/works/${currentCategory}/${imageHash}`);
        },
        [images, router, currentCategory]
    );

    if (error) {
        return (
            <div className="text-red-500 text-center m-10 h-[60vh] flex items-center justify-center">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen min-w-screen bg-white">
            <main
                className={`container mx-auto px-4 transition-opacity duration-500 ${loading && images.length === 0 ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                        <GalleryImage
                            key={image.id}
                            image={image}
                            index={index}
                            isLoaded={loadedImages.includes(index)}
                            onLoad={() => handleImageLoad(index)}
                            onClick={() => openImagePage(index)}
                        />
                    ))}
                </div>
                {loading && (
                    <div className="flex items-center justify-center h-48">
                        <Loading />
                    </div>
                )}
            </main>
        </div>
    );
}
interface GalleryImageProps {
    image: ImageData;
    index: number;
    isLoaded: boolean;
    onLoad: () => void;
    onClick: () => void;
}

const GalleryImage = ({ image, index, isLoaded, onLoad, onClick }: GalleryImageProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            onClick={onClick}
            aria-label={`Open image ${image.name}`}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter') onClick();
            }}
        >

            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-400 animate-pulse" />
            )}

            <IKImage
                urlEndpoint={urlEndpoint}
                path={image.filePath}
                transformation={[{ height: '400', width: '400' }]}
                lqip={{ active: true }}
                loading="lazy"
                onLoad={onLoad}
                alt={image.name}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            </div>
        </motion.div>
    );
};