import { element } from "prop-types"
import { useRouter } from "next/router"
import clsx from "clsx"

// Redux
import { connect } from "react-redux"

// Auth
import { useAuth } from "src/lib/auth"

// Actions
import { toggleSidebar } from "src/store/modules/layout/actions"

// Icons
import { RiDashboardLine } from "react-icons/ri"
import { IoIosArrowRoundBack } from "react-icons/io"
import { FiUser } from "react-icons/fi"

// Components
import {
  AppBar,
  useScrollTrigger,
  Slide,
  Container,
  Box,
  useMediaQuery,
  IconButton,
  Avatar,
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import { Text, Link, Button } from "src/components/Atoms"
import InputSearch from "src/components/Molecules/InputSearch"

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

const Navbar = ({ toggleSidebar, openSidebar }) => {
  const classes = styles()
  const theme = useTheme()
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"))
  const matchesXs = useMediaQuery(theme.breakpoints.down("xs"))

  const { push } = useRouter()

  // Auth
  const { user, signOut } = useAuth()

  return (
    <HideOnScroll openSidebar={openSidebar}>
      <AppBar position="sticky" className={classes.root}>
        <Container
          className={clsx({
            [classes.content]: true,
          })}
          fixed
        >
          <Box display="flex" alignItems="center">
            <IconButton
              edge="start"
              color="secondary"
              className={clsx({
                [classes.menuButton]: true,
                [classes.right]: true,
              })}
              aria-label="menu"
              onClick={toggleSidebar}
            >
              {openSidebar ? (
                <IoIosArrowRoundBack color="#fff" />
              ) : (
                <div className={classes.menuContent}>
                  <div />
                  <div />
                </div>
              )}
            </IconButton>

            <Link href="/" className={classes.title}>
              Premios Juventud
              <RiDashboardLine style={{ marginLeft: 10 }} />
            </Link>
          </Box>

          {!matchesXs && <InputSearch />}

          {!matchesSm && (
            <>
              {user ? (
                <>
                  <div>
                    <Button className={classes.button} color="secondary">
                      <Avatar className={classes.avatar}>
                        <Text>
                          <FiUser />
                        </Text>
                      </Avatar>
                      <Text className={classes.textAvatar}>{user?.name}</Text>
                    </Button>
                    <Button
                      className={classes.button}
                      color="secondary"
                      onClick={() => push("/")}
                    >
                      Nominados
                    </Button>
                    <Button
                      className={classes.button}
                      color="secondary"
                      onClick={() => push("/populares")}
                    >
                      Ganadores
                    </Button>
                    <Button
                      className={classes.button}
                      color="secondary"
                      onClick={signOut}
                    >
                      Cerrar sesión
                    </Button>
                  </div>
                </>
              ) : (
                <div>
                  <Button
                    className={classes.button}
                    color="secondary"
                    onClick={() => push("/")}
                  >
                    Nominados
                  </Button>
                  <Button
                    className={classes.button}
                    color="secondary"
                    onClick={() => push("/ganadores")}
                  >
                    Ganadores
                  </Button>
                  <Button
                    className={classes.button}
                    color="secondary"
                    onClick={() => push("/iniciar-sesion")}
                  >
                    Iniciar sesión
                  </Button>
                  {/*  <Button
                    className={classes.button}
                    color="secondary"
                    onClick={() => push("/crear-cuenta")}
                  >
                    Crear cuenta
                  </Button> */}
                </div>
              )}
            </>
          )}
        </Container>
        {matchesXs && <InputSearch />}
      </AppBar>
    </HideOnScroll>
  )
}

const mapStateToProps = ({ layout: { openSidebar } }) => ({
  openSidebar,
})

export default connect(mapStateToProps, { toggleSidebar })(Navbar)
