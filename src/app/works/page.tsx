import { NextPage } from 'next'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    return <div className='flex justify-center h-64'>
        <h1 className='text-xl'>Please choose a category.</h1>
    </div>
}

export default Page