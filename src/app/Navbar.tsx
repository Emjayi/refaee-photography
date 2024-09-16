'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { navbarLinks } from '@/lib/data';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const Navbar = () => {
    const path = usePathname();
    const segments = path.split('/').filter(Boolean);

    // Hide the Navbar on image pages (e.g., /works/[category]/[param])
    if (segments[0] === 'works' && segments.length >= 3) {
        return null;
    }

    const [isHome, setHome] = useState(true);
    const [infoDisplay, setInfoDisplay] = useState('hidden');
    const [worksDisplay, setWorksDisplay] = useState('hidden');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (path === '/' || path === '/about') {
            setHome(true);
        } else {
            setHome(false);
        }
    }, [path]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setInfoDisplay('hidden');
                setWorksDisplay('hidden');
            } else if (path === '/') {
                setInfoDisplay('hidden');
                setWorksDisplay('hidden');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [path]);

    const works = () => {
        if (worksDisplay === 'hidden') {
            if (infoDisplay === 'hidden') {
                setWorksDisplay('');
            } else {
                setInfoDisplay('hidden');
                setWorksDisplay('');
            }
        } else {
            setWorksDisplay('hidden');
        }
    };

    const info = () => {
        if (infoDisplay === 'hidden') {
            if (worksDisplay === 'hidden') {
                setInfoDisplay('');
            } else {
                setWorksDisplay('hidden');
                setInfoDisplay('');
            }
        } else {
            setInfoDisplay('hidden');
        }
    };

    return (
        <>
            <nav
                className={
                    isHome
                        ? 'z-10 fixed w-screen top-0 py-4'
                        : 'z-10 sticky top-0 py-4 bg-white'
                }
            >
                {/* Desktop Navbar */}
                <div className="hidden md:flex justify-center">
                    <ul className="flex gap-4 rounded-full px-6 py-2 bg-gradient-to-b">
                        <li
                            className={
                                path === '/'
                                    ? 'hidden'
                                    : 'text-zinc-400 hover:text-zinc-200 duration-200 mix-blend-exclusion bg-blend-luminosity text-ellipsis cursor-pointer'
                            }
                        >
                            <Link href="/">Home</Link>
                        </li>
                        <li
                            className={
                                worksDisplay !== 'hidden'
                                    ? 'text-zinc-200 duration-200 mix-blend-exclusion text-ellipsis cursor-pointer'
                                    : 'text-zinc-400 hover:text-zinc-200 duration-200 mix-blend-exclusion text-ellipsis cursor-pointer'
                            }
                            onClick={works}
                        >
                            Works
                        </li>
                        <li
                            className={
                                infoDisplay !== 'hidden'
                                    ? 'text-zinc-200 duration-200 mix-blend-exclusion text-ellipsis cursor-pointer'
                                    : 'text-zinc-400 hover:text-zinc-200 duration-200 mix-blend-exclusion text-ellipsis cursor-pointer'
                            }
                            onClick={info}
                        >
                            Information
                        </li>
                        <li className="text-zinc-400 hover:text-zinc-200 duration-200 mix-blend-exclusion text-ellipsis cursor-pointer">
                            Sales
                        </li>
                    </ul>
                </div>
                {/* Works and Info Dropdowns */}
                <div className="hidden md:flex justify-center">
                    <div id="works" className={worksDisplay}>
                        <ul className="flex gap-4">
                            {navbarLinks.works.map((link, idx) => (
                                <li
                                    key={idx}
                                    className={
                                        link.link === path
                                            ? 'text-zinc-200 duration-200 mix-blend-exclusion bg-blend-luminosity text-ellipsis cursor-pointer'
                                            : 'text-zinc-400 hover:text-zinc-200 duration-200 mix-blend-exclusion bg-blend-luminosity text-ellipsis cursor-pointer'
                                    }
                                >
                                    <Link href={link.link}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div id="info" className={infoDisplay}>
                        <ul className="flex gap-4">
                            {navbarLinks.info.map((link, idx) => (
                                <li
                                    key={idx}
                                    className={
                                        link.link === path
                                            ? 'text-zinc-200 duration-200 mix-blend-exclusion bg-blend-luminosity text-ellipsis cursor-pointer'
                                            : 'text-zinc-400 hover:text-zinc-200 duration-200 mix-blend-exclusion bg-blend-luminosity text-ellipsis cursor-pointer'
                                    }
                                >
                                    <Link href={link.link}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Mobile Navbar */}
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden bg-white/50 fixed top-8 left-8 z-50"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="w-[40%] z-[10000] h-full p-0 bg-transparent border-opacity-0"
                    >
                        <div className="grid grid-col w-full h-full text-zinc-200 bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-40">
                            <nav className="flex flex-col gap-4 p-4 flex-grow">
                                <Button
                                    variant="ghost"
                                    asChild
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex justify-start"
                                >
                                    <Link href="/">Home</Link>
                                </Button>
                                <Accordion type="single" collapsible className="pl-4">
                                    <AccordionItem value="works" className="justify-start">
                                        <AccordionTrigger>Works</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex flex-col items-start gap-2">
                                                {navbarLinks.works.map((link, idx) => (
                                                    <Button
                                                        key={idx}
                                                        variant="ghost"
                                                        asChild
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <Link href={link.link}>{link.name}</Link>
                                                    </Button>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="info" className="justify-start">
                                        <AccordionTrigger>Information</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex flex-col items-start gap-2">
                                                {navbarLinks.info.map((link, idx) => (
                                                    <Button
                                                        key={idx}
                                                        variant="ghost"
                                                        asChild
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <Link href={link.link}>{link.name}</Link>
                                                    </Button>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                <Button
                                    variant="ghost"
                                    asChild
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex justify-start"
                                >
                                    <Link href="#">Sales</Link>
                                </Button>
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </>
    );
};

export default Navbar;
