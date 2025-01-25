const Navbar = () => {

    const navMenuStyle = "w-1/3 border-b-4 border-b-white hover:border-b-4 hover:border-b-rose-700 rounded transition-all"
  return (
    <header className="h-[10vh] flex justify-between items-center mx-8">
        <h1 className="font-bold text-2xl underline">Agenda</h1>
        <nav className="h-[8vh] grid place-content-center">
            <ul className="flex gap-12">
                <li className={navMenuStyle}>Home</li>
                <li className={navMenuStyle}>About</li>
                <li className={navMenuStyle}>Contact</li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar