import { useRouter } from "next/router"
import { map } from "lodash"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"

// Redux
import { useDispatch } from "react-redux"

// Icons
import { IoCloseOutline } from "react-icons/io5"
import { HiOutlineMenuAlt1 } from "react-icons/hi"

// Actions
import { closeSidebar, toggleSidebar } from "src/store/slices/layout"

// Components
import { Button, Box, Container, Hide, Show } from "@chakra-ui/react"
import { Logo } from "src/components/Atoms"
import useAppSelector from "src/hooks/useAppSelector"

// Data
import data from "../Sidebar/data" 

const Navbar = () => {
  const open = useAppSelector((s) => s.layout.openSidebar)
  const dispatch = useDispatch()
  const { push, pathname } = useRouter()

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
          <Logo color="white" />
        </Box>

        <Hide above="md">
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

        <Show above="md">
          <Box display="flex" alignItems="center">
            {map(data, ({ link, href }) => (
              <Button
                color="white"
                variant="link"
                textDecoration={pathname === href ? "underline" : "inherit"}
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
                  push("/iniciar-sesion")
                }}
              >
                Cerrar sesión
              </Button>
            )}
          </Box>
        </Show>
      </Container>
    </Box>
  )
}

export default Navbar
