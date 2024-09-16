// app/works/[category]/[param]/page.tsx

'use client';

import { useContext } from 'react';
import { IKImage } from 'imagekitio-react';
import { ImageContext } from './layout';
import Loading from '@/app/loading';
import { motion } from 'framer-motion';

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

export default function ImagePage() {
    const context = useContext(ImageContext);

    if (!context) {
        return (
            <div className="flex items-center justify-center h-48">
                <Loading />
            </div>
        );
    }

    const { images, currentIndex, error } = context;

    if (error) {
        return (
            <div className="text-red-500 text-center m-10 h-[60vh] flex items-center justify-center">
                {error}
            </div>
        );
    }

    if (images.length === 0) {
        return (
            <div className="flex items-center justify-center h-48">
                <Loading />
            </div>
        );
    }

    const currentImage = images[currentIndex];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .25, delay: .2 }}
            className='w-[100dvw]'>
            <IKImage
                urlEndpoint={urlEndpoint}
                path={currentImage.filePath}
                lqip={{ active: true }}
                loading="lazy"
                alt={currentImage.name}
                className="object-contain w-[100dvw] h-[100dvh] md:max-h-[80dvh]"
            />
        </motion.div>
    );
}
