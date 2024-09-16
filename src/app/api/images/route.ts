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
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    if (!category) {
        return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    try {
        const images = await imagekit.listFiles({
            path: `/${category}`,
            sort: 'DESC_CREATED',
            limit: limit,
            skip: (page - 1) * limit,
        });

        // Generate a hash for each image
        const imagesWithHash = images.map((image) => {
            const hash = crypto.createHash('sha256').update(image.fileId).digest('hex').substring(0, 10);
            return { ...image, hash };
        });

        return NextResponse.json({
            images: imagesWithHash,
            hasMore: images.length === limit,
        });
    } catch (error: any) {
        console.error('Error in /api/images:', error);
        return NextResponse.json(
            { error: 'Failed to fetch images', details: error.message || 'Unknown error' },
            { status: 500 }
        );
    }
}
