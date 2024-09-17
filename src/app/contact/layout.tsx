import Footer from "@/components/ui/Footer"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact',
}

const Layout = ({ children }: any) => {
    return <div className="pt-24 bg-white">{children}
    </div>
}

export default Layout