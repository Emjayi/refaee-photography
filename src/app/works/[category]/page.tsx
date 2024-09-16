import Gallery from '@/components/gallery'
import { navbarLinks } from '@/lib/data'

export async function generateStaticParams() {
    return navbarLinks.works.map((work) => ({
        category: work.name.toLowerCase(),
    }))
}

export default function WorksPage({ params }: { params: { category: string } }) {
    return (
        <>
            <h1 className='md:hidden w-full text-center text-xl -mt-[8.7vh] mb-[8.7vh]'>{params.category}</h1>
            <Gallery />
        </>
    )
}