import Footer from "@/components/ui/Footer"

const Layout = ({ children }: any) => {
    return <div className=" bg-black pt-12 md:pt-0">{children}
        <div className="md:fixed md:bottom-0 md:flex md:justify-center md:w-full">
            <Footer />
        </div>
    </div>
}

export default Layout