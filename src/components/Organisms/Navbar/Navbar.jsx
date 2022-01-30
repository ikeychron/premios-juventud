import { element } from "prop-types"
import { useRouter } from "next/router"
import clsx from "clsx"
import { map } from "lodash"

// Redux
import { useSelector, useDispatch } from "react-redux"

// Auth
import { useAuth } from "src/lib/auth"

// Actions
import { toggleSidebar } from "src/store/modules/layout/actions"

// Icons
import { GiPodiumWinner } from "react-icons/gi"
import { IoIosArrowRoundBack } from "react-icons/io"

// Components
import {
  AppBar,
  useScrollTrigger,
  Slide,
  Container,
  Box,
  useMediaQuery,
  IconButton,
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import { Link, Button } from "src/components/Atoms"
// import InputSearch from "src/components/Molecules/InputSearch"

// Data
import data from "../Sidebar/data"
import dataAuth from "../Sidebar/dataAuth"

// styles
import styles from "./styles"

function HideOnScroll({ children, openSidebar }) {
  const trigger = useScrollTrigger()

  if (openSidebar) return <>{children}</>

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

HideOnScroll.propTypes = {
  children: element,
}

const Navbar = () => {
  const classes = styles()
  const theme = useTheme()
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"))

  const open = useSelector((s) => s.layout.openSidebar)
  const dispatch = useDispatch()
  const { push } = useRouter()

  // Auth
  const { user, signOut } = useAuth()

  return (
    <HideOnScroll openSidebar={open}>
      <AppBar position="sticky" className={classes.root}>
        <Container
          className={clsx({
            [classes.content]: true,
          })}
          fixed
        >
          <Box display="flex" alignItems="center">
            {matchesMd && (
              <IconButton
                edge="start"
                color="secondary"
                className={clsx({
                  [classes.menuButton]: true,
                  [classes.right]: true,
                })}
                aria-label="menu"
                onClick={() => dispatch(toggleSidebar())}
              >
                {open ? (
                  <IoIosArrowRoundBack color="#fff" />
                ) : (
                  <div className={classes.menuContent}>
                    <div />
                    <div />
                  </div>
                )}
              </IconButton>
            )}
            <Link href="/" className={classes.title}>
              Premios Juventud
              <GiPodiumWinner style={{ marginLeft: 10 }} />
            </Link>
          </Box>

          {/*  {!matchesXs && <InputSearch />} */}

          {!matchesMd && (
            <div>
              {map(user ? dataAuth : data, ({ link, href }) => (
                <Button
                  className={classes.button}
                  color="secondary"
                  onClick={() => push(href)}
                  key={href}
                >
                  {link}
                </Button>
              ))}

              {user && (
                <Button
                  className={classes.button}
                  color="secondary"
                  onClick={signOut}
                >
                  Cerrar sesión
                </Button>
              )}
            </div>
          )}
        </Container>
        {/* {matchesXs && <InputSearch />} */}
      </AppBar>
    </HideOnScroll>
  )
}

export default Navbar
