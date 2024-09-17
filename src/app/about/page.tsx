import { NextPage } from 'next'
import Image from 'next/image'
import alireza from '/public/Alireza.jpg'
import alirezaMobile from '/public/Alireza-mobile.jpg'


const Page: NextPage = () => {
    return (
        <>
            <div className='md:flex items-center bg-black'>
                <Image alt='About Alireza' src={alireza} className='h-[100dvh] object-contain object-left justify-self-start hidden md:block' />
                <Image alt='About Alireza' src={alirezaMobile} className='h-[80vh] object-contain justify-self-start block md:hidden' />
                <p className='px-8 block md:hidden text-justify py-8 bg-black text-zinc-400'>
                    With over 20 years of experience, Alireza Refaei is a professional photographer and photography tutor renowned for his expertise. his work encompasses a diverse range of photographic disciplines, including product photography, liquids, landscapes, advanced lighting control, still life, architecture, and industrial photography.

                    He conducts workshops and offers offline courses tailored for amateur and intermediate photographers. Notably, his "Pure Joy of Photography" courses have been published for the first time in Iran.
                </p>
                <p className='px-8 hidden md:block absolute w-[600px] right-32 text-justify py-8 bg-black text-zinc-400'>
                    With over 20 years of experience, Alireza Refaei is a professional photographer and photography tutor renowned for his expertise. his work encompasses a diverse range of photographic disciplines, including product photography, liquids, landscapes, advanced lighting control, still life, architecture, and industrial photography.

                    He conducts workshops and offers offline courses tailored for amateur and intermediate photographers. Notably, his "Pure Joy of Photography" courses have been published for the first time in Iran.
                </p>
            </div>
        </>
    )
}

export default Page