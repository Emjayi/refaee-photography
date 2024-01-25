"use client"
import Image from 'next/image'
import Link from 'next/link'
import Nav from './nav'
import { useEffect } from 'react'
import Navbar from './nav'


export default function Home() {

  useEffect(() => {
    let pos = document.documentElement;
    pos.addEventListener('mousemove', e => {
      pos.style.setProperty('--x', e.clientX + 'px')
      pos.style.setProperty('--y', e.clientY + 'px')
    })
    document.addEventListener("mousemove", parallax);
    function parallax(this: any, e: any) {
      this.querySelectorAll(".layer").forEach((layer: { getAttribute: (arg0: string) => any; style: { transform: string } }) => {
        const speed = layer.getAttribute("data-speed")

        const x = (window.innerWidth - e.pageX * speed) / 100
        const y = (window.innerHeight - e.pageY * speed) / 100

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
      })
    };
  })

  return (
    <div className="flex max-h-[80vh] items-center justify-center">
      <div className="parallax">
        <Image src="/saye.png" id="shadow" data-speed="8" width={400} height={400} alt="shadow" className="layer" />
        <Image src="/Untitled.png" id="bic" data-speed="4" width={2400} height={1800} alt="bic" className="layer" />
      </div>
      <div className="light"></div>
    </div>
  )
}
