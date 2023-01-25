import { useRouter } from "next/router"
import { map } from "lodash"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"

// Redux
import { useDispatch } from "react-redux"

// Actions
import { closeSidebar, toggleSidebar } from "src/store/slices/layout"

// Icons
import { IoCloseOutline } from "react-icons/io5"
import { HiOutlineMenuAlt1 } from "react-icons/hi"

// Components
import { Button, Box, Container, Hide } from "@chakra-ui/react"
import { Link, Logo } from "src/components/Atoms"
import useAppSelector from "src/hooks/useAppSelector"

// Data
import data from "../Sidebar/data"
import dataAuth from "../Sidebar/dataAuth"

const Navbar = () => {
  const open = useAppSelector((s) => s.layout.openSidebar)
  const dispatch = useDispatch()
  const { push } = useRouter()

  // Auth
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <Box
      w="100%"
      boxShadow="0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
      bg="primary.500"
      h="72px"
      display="flex"
      alignItems="center"
    >
      <Container
        maxW="container.xl"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Link href="/" color="white">
            <Logo />
          </Link>
        </Box>

        <Hide above="sm">
          <Button
            leftIcon={
              open ? (
                <IoCloseOutline size={20} color="#fff" />
              ) : (
                <HiOutlineMenuAlt1 size={20} color="#fff" />
              )
            }
            mr="10px"
            aria-label="menu"
            onClick={() => dispatch(toggleSidebar())}
            borderRadius="full"
          >
            {open ? "Cerrar" : "Abrir"}
          </Button>
        </Hide>

        <Hide below="sm">
          <Box display="flex" alignItems="center">
            {map(session?.access_token ? dataAuth : data, ({ link, href }) => (
              <Button
                color="white"
                variant="link"
                mr="25px"
                onClick={() => {
                  closeSidebar()
                  push(href)
                }}
                key={href}
              >
                {link}
              </Button>
            ))}

            {session?.access_token && (
              <Button
                color="white"
                variant="link"
                onClick={async () => {
                  closeSidebar()
                  await supabase.auth.signOut()
                }}
              >
                Cerrar sesión
              </Button>
            )}
          </Box>
        </Hide>
      </Container>
    </Box>
  )
}

export default Navbar
