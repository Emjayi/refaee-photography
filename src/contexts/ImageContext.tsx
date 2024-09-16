import { createContext } from 'react';

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
