const Layout = ({ children }: any) => {
    return <div className="pt-24 bg-zinc-300">{children}
        <footer className="footer w-full bottom-0">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
                <p>
                    <span className="text-sm text-gray-400 sm:text-center">© 2023 <a href="/" className="hover:underline">Refaee™</a>. All Rights Reserved.
                    </span>
                </p>
            </div>
        </footer>
    </div>
}

export default Layout