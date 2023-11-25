'use client'

import { Tab } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
    return (
        <>
            <Tab.Group manual>
                <div className="flex flex-col items-center px-24 py-4">

                    <div className="container">
                        <Tab.List>
                            <Tab className={'hover:'} >
                                Tab 1
                            </Tab>
                        </Tab.List>
                    </div>

                    <div className="container">
                        <Tab.Panels>
                            <Tab.Panel><Link href={"/"}>Hello</Link></Tab.Panel>
                            <Tab.Panel><Link href={"/information"}>Another one</Link></Tab.Panel>
                            {/* ... */}
                        </Tab.Panels>
                    </div>
                </div>
            </Tab.Group>
        </>
    )
}

