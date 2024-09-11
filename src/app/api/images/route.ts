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

    if (!category) {
        return NextResponse.json({ error: 'Category is required' }, { status: 400 })
    }

    try {
        const images = await imagekit.listFiles({
            path: `/${category}`,
            sort: 'DESC_CREATED'
        })

        return NextResponse.json(images)
    } catch (error) {
        console.error('Error in /api/images:', error)
        return NextResponse.json(
            { error: 'Failed to fetch images', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}