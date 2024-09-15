import Contact from '@/components/contact'
import { NextPage } from 'next'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    return <div className='grid grid-cols-2 px-36'>
        <Contact />
    </div>
}

export default Page