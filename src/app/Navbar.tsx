'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { navbarLinks } from '@//lib/data'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const path = usePathname()
    const [isHome, setHome] = useState(true)
    useEffect(() => { if (path === "/") { setHome(true) } else { setHome(false) };[] })

    const [infoDisplay, setInfoDisplay] = useState('hidden')
    const [worksDisplay, setWorksDisplay] = useState('hidden')
    const works = () => {
        if (worksDisplay === 'hidden') {
            if (infoDisplay === 'hidden') { setWorksDisplay('') } else { setInfoDisplay('hidden'); setWorksDisplay('') }
        } else { setWorksDisplay('hidden') }
    }
    const info = () => {
        if (infoDisplay === 'hidden') {
            if (worksDisplay === 'hidden') { setInfoDisplay('') } else { setWorksDisplay('hidden'); setInfoDisplay('') }
        } else { setInfoDisplay('hidden') }
    }
    return (
        <nav className={isHome ? ' z-10 fixed w-screen top-0 py-4' : ' z-10 sticky top-0 py-4 bg-white'}>
            <div className='flex justify-center  '>
                <ul className='flex gap-4 rounded-full px-6 py-2 bg-gradient-to-b'>
                    <li className={(path === "/") ? 'hidden' : 'text-zinc-400 hover:text-white duration-200 mix-blend-exclusion bg-blend-luminosity text-ellipsis cursor-pointer'}><Link href="/">Home</Link></li>
                    <li className={worksDisplay !== 'hidden' ? 'text-zinc-200 duration-200 mix-blend-exclusion text-ellipsis cursor-pointer' : 'text-zinc-400 hover:text-white duration-200 mix-blend-exclusion text-ellipsis cursor-pointer'} onClick={works}>Works</li>
                    <li className={infoDisplay !== 'hidden' ? 'text-zinc-200 duration-200 mix-blend-exclusion text-ellipsis cursor-pointer' : 'text-zinc-400 hover:text-white duration-200 mix-blend-exclusion text-ellipsis cursor-pointer'} onClick={info}>Information</li>
                    <li className={'text-zinc-400 hover:text-white duration-200 mix-blend-exclusion text-ellipsis cursor-pointer'}>Sales</li>
                </ul>
            </div>
            <div id="works" className={'flex justify-center ' + (worksDisplay)}>
                <ul className='flex gap-4 '>
                    {navbarLinks.works.map((link, idx) => (
                        <li key={idx} className={(link.link === path) ? 'text-zinc-200 duration-200 mix-blend-exclusion bg-blend-luminosity text-ellipsis cursor-pointer' : 'text-zinc-400 hover:text-zinc-200 duration-200 mix-blend-exclusion bg-blend-luminosity text-ellipsis cursor-pointer'}><Link href={link.link}>{link.name}</Link></li>
                    ))}
                </ul>
            </div>
            <div id="info" className={'flex justify-center ' + (infoDisplay)}>
                <ul className='flex gap-4 '>
                    {navbarLinks.info.map((link, idx) => (
                        <li key={idx} className={(link.link === path) ? 'text-zinc-200 duration-200 mix-blend-exclusion bg-blend-luminosity text-ellipsis cursor-pointer' : 'text-zinc-400 hover:text-zinc-200 duration-200 mix-blend-exclusion bg-blend-luminosity text-ellipsis cursor-pointer'}><Link href={link.link}>{link.name}</Link></li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar