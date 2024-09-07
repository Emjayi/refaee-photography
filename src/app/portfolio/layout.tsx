import Footer from "@/components/ui/Footer"

const Layout = ({ children }: any) => {
    return <div className="pt-24 bg-zinc-300">{children}
        <Footer />
    </div>
}

export default Layout