// Layout
import Navbar from "src/components/Organisms/Navbar"
import Sidebar from "src/components/Organisms/Sidebar"

const Layout = ({ children }) => {
  return (
    <main>
      <Navbar />

      <div>
        <Sidebar />

        <div>{children}</div>
      </div>
    </main>
  )
}

export default Layout
