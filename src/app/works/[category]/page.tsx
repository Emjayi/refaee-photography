import Gallery from '@/components/gallery'
import { navbarLinks } from '@/lib/data'

export async function generateStaticParams() {
    return navbarLinks.works.map((work) => ({
        category: work.name.toLowerCase(),
    }))
}

export default function WorksPage({ params }: { params: { category: string } }) {
    return <Gallery />
}