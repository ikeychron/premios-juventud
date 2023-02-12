import map from "lodash/map"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useDispatch } from "react-redux"

// Layout
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Box,
  Heading,
} from "@chakra-ui/react"
import { Link } from "src/components/Atoms"
import useAppSelector from "src/hooks/useAppSelector"

// Icon
import { IoIosLogOut } from "react-icons/io"

import { closeSidebar } from "src/store/slices/layout"

// Data
import dataNav from "../../../data/dataNav"

const Sidebar = () => {
  const dispatch = useDispatch()
  const open = useAppSelector((s) => s.layout.openSidebar)
  const showQuestions = useAppSelector(
    (s) => s.generics.featureFlags?.show_questions
  )
  const newVote = useAppSelector((s) => s.generics.featureFlags?.new_vote)

  // Auth
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <Drawer
      isOpen={open}
      placement="left"
      onClose={() => dispatch(closeSidebar())}
    >
      <DrawerOverlay />
      <DrawerContent bg="secondary.600">
        <Box display="flex" flexDir="column">
          <Heading
            component="h6"
            size="md"
            color="white"
            textAlign="center"
            my="30px"
          >
            Menú
          </Heading>

          {map(
            dataNav(showQuestions, newVote),
            ({ Icon, href = "/", link, size }) => (
              <Link
                w="100%"
                h="50px"
                href={href}
                key={href}
                onClick={() => dispatch(closeSidebar())}
                variant="solid"
                leftIcon={
                  <Icon size={!size ? 24 : size} style={{ marginRight: 12 }} />
                }
                bg="secondary.600"
              >
                {link}
              </Link>
            )
          )}
          {session?.access_token && (
            <Link
              href=""
              onClick={async () => {
                await supabase.auth.signOut()
              }}
              w="100%"
              h="50px"
              variant="solid"
              leftIcon={<IoIosLogOut size={24} style={{ marginRight: 12 }} />}
              bg="secondary.600"
            >
              Cerrar sesión
            </Link>
          )}
        </Box>
      </DrawerContent>
    </Drawer>
  )
}

export default Sidebar
