'use client'
import { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
    const [infoDisplay, setInfoDisplay] = useState('hidden')
    const [worksDisplay, setWorksDisplay] = useState('hidden')
    const works = () => {
        if (infoDisplay === 'hidden') { setWorksDisplay('') } else { setInfoDisplay('hidden'); setWorksDisplay('') }
    }
    const info = () => {
        if (worksDisplay === 'hidden') { setInfoDisplay('') } else { setWorksDisplay('hidden'); setInfoDisplay('') }
    }
    return (
        <nav className=' z-10 absolute top-2'>
            <div className='flex justify-center'>
                <ul className='flex gap-4 '>
                    <li className='text-gray-400 hover:text-gray-100 cursor-pointer' onClick={works}>Works</li>
                    <li className='text-gray-400 hover:text-gray-100 cursor-pointer' onClick={info}>Information</li>
                </ul>
            </div>
            <div id="works" className={'flex justify-center ' + (worksDisplay)}>
                <ul className='flex gap-4 '>
                    <li className='text-gray-400 hover:text-gray-100 cursor-pointer'><Link href={'/works'}>Cars</Link></li>
                    <li className='text-gray-400 hover:text-gray-100 cursor-pointer'><Link href={'/works'}>Works</Link></li>
                </ul>
            </div>
            <div id="info" className={'flex justify-center ' + (infoDisplay)}>
                <ul className='flex gap-4 '>
                    <li className='text-gray-400 hover:text-gray-100 cursor-pointer'>Works</li>
                    <li className='text-gray-400 hover:text-gray-100 cursor-pointer'>Information</li>
                    <li className='text-gray-400 hover:text-gray-100 cursor-pointer'>Information</li>
                    <li className='text-gray-400 hover:text-gray-100 cursor-pointer'>Information</li>
                    <li className='text-gray-400 hover:text-gray-100 cursor-pointer'>Information</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar