import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>Hello World</h1>
      <Image src={"./public/next.svg"} alt="Sample" width={100} height={160} />
    </main>
  )
}
