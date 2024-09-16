import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';
import crypto from 'crypto';

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const hash = searchParams.get('hash');

    if (!hash) {
        return NextResponse.json({ error: 'Hash is required' }, { status: 400 });
    }

    try {
        // Fetch images from all categories (adjust as needed)
        const images = await imagekit.listFiles({
            limit: 1000, // Adjust limit or implement pagination as needed
        });

        // Find the image with the matching hash
        const image = images.find((image) => {
            const imageHash = crypto.createHash('sha256').update(image.fileId).digest('hex').substring(0, 10);
            return imageHash === hash;
        });

        if (image) {
            // Include the hash in the response
            const imageWithHash = { ...image, hash };
            return NextResponse.json({ image: imageWithHash });
        } else {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }
    } catch (error: any) {
        console.error('Error in /api/image:', error);
        return NextResponse.json(
            { error: 'Failed to fetch image', details: error.message || 'Unknown error' },
            { status: 500 }
        );
    }
}
