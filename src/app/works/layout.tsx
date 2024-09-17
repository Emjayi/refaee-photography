import Footer from "@/components/ui/Footer"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Works',
}

const Layout = ({ children }: any) => {
    return <div className="pt-24 bg-white min-h-screen flex flex-col justify-between">
        {children}
        <Footer />
    </div>
}

export default Layout