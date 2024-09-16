import { NextRequest, NextResponse } from 'next/server'
import ImageKit from 'imagekit'
import { navbarLinks } from '@/lib/data'

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!
})

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const imageId = searchParams.get('id') // Get the image ID if provided

    try {
        if (imageId) {
            // Fetch a single image by ID
            const image = await imagekit.getFileDetails(imageId)
            return NextResponse.json({ image })
        } else if (category) {
            // Fetch list of images by category
            const images = await imagekit.listFiles({
                path: `/${category}`,
                sort: 'DESC_CREATED',
                limit: limit,
                skip: (page - 1) * limit
            })

            return NextResponse.json({
                images,
                hasMore: images.length === limit
            })
        } else {
            return NextResponse.json({ error: 'Category is required' }, { status: 400 })
        }
    } catch (error) {
        console.error('Error in /api/images:', error)
    }
}