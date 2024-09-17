import Footer from "@/components/ui/Footer"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Exhibition',
}

const Layout = ({ children }: any) => {
    return <div className="pt-24 bg-white min-h-[100dvh] flex flex-col justify-between">{children}
        <Footer />
    </div>
}

export default Layout