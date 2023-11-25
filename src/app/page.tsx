import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className='flex'>
        <Image src={"/next.svg"} alt="Sample" width={400} height={560} />
      </div>
    </main>
  )
}
