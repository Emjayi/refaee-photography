import { NextPage } from 'next'
import Image from 'next/image'
import alireza from '/public/Alireza.jpg'


const Page: NextPage = () => {
    return <div>
        <Image alt='About Alireza' src={alireza} className='h-[100dvh]' />
        <p className='px-24 py-8'>
            Alireza Refaei is a professional photographer and a photography tutorial with over 20 years experience in photography. He is commissioned by leading Saman company.his work on photography can cover products, liquids, landscape, control of lights, life still, architecture and industrial photography.
            He has workshops and offline courses for amature and intermediate photographers
            pure joy of photography courses has been published for the first time in Iran.
        </p>
    </div>
}

export default Page