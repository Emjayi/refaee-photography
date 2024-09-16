'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';
import Lenis from 'lenis'

interface ImageData {
    id: string;
    filePath: string;
    name: string;
    createdAt: string;
    hash: string;
}

interface ImageCache {
    [category: string]: ImageData[];
}

interface ImageCacheContextType {
    cache: ImageCache;
    setCache: React.Dispatch<React.SetStateAction<ImageCache>>;
}

const ImageCacheContext = createContext<ImageCacheContextType | undefined>(undefined);

export const ImageCacheProvider = ({ children }: { children: React.ReactNode }) => {
    const [cache, setCache] = useState<ImageCache>({});

    useEffect(() => {
        const lenis = new Lenis()
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])

    return (
        <ImageCacheContext.Provider value={{ cache, setCache }}>
            {children}
        </ImageCacheContext.Provider>
    );
};

export const useImageCache = () => {
    const context = useContext(ImageCacheContext);
    if (!context) {
        throw new Error('useImageCache must be used within an ImageCacheProvider');
    }
    return context;
};
