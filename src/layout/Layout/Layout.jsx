import { Container } from "@chakra-ui/react"
import Navbar from "src/components/Organisms/Navbar"
import Sidebar from "src/components/Organisms/Sidebar"

const Layout = ({ children }) => {
  return (
    <main>
      <Navbar />
      <Sidebar />

      <Container maxW="container.md" my="40px">
        {children}
      </Container>
    </main>
  )
}

export default Layout
