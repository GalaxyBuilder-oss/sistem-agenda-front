import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <>
    <Navbar />
    <main className="h-[90vh] px-4 overflow-y-scroll">
    <Outlet />
    </main>
    </>
  )
}

export default App