import { NextPage } from 'next'
import Image from 'next/image'
import alireza from '/public/Alireza.jpg'
import alirezaMobile from '/public/alireza-mobile.jpg'


const Page: NextPage = () => {
    return (
        <>
            <div className='md:flex items-center bg-black'>
                <Image alt='About Alireza' src={alireza} className='h-[100dvh] object-contain justify-self-start hidden md:block' />
                <Image alt='About Alireza' src={alirezaMobile} className='h-[80dvh] object-contain justify-self-start block md:hidden' />
                <p className='px-8 md:px-8 md:-ml-64 md:mr-32 text-justify py-8 bg-black text-zinc-400'>
                    Alireza Refaei is a professional photographer and a photography tutorial with over 20 years experience in photography. He is commissioned by leading Saman company. his work on photography can cover products, liquids, landscape, control of lights, life still, architecture and industrial photography.
                    He has workshops and offline courses for amature and intermediate photographers
                    pure joy of photography courses has been published for the first time in Iran.
                </p>
            </div>
        </>
    )
}

export default Page