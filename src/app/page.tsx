
import Image from 'next/image'
import Link from 'next/link'
import Nav from './nav'


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      {/* <div className="parallax">
        <Image src="/saye.png" id="shadow" data-speed="6" fill={true} alt="shadow" className="layer" />
        <Image src="/Untitled-2.png" id="bic" data-speed="4" width={1200} height={600} alt="bic" className="layer" />
      </div> */}
      <div className="light"></div>
    </div>
  )
}
