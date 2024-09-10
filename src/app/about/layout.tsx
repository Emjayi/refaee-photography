import Footer from "@/components/ui/Footer"

const Layout = ({ children }: any) => {
    return <div className=" bg-white">{children}
        <Footer />
    </div>
}

export default Layout