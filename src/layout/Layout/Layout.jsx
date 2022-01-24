// Layout
import Navbar from "src/components/Organisms/Navbar"
import Sidebar from "src/components/Organisms/Sidebar"

// Styles
import { makeStyles } from "@material-ui/core/styles"
const styles = makeStyles(({ breakpoints }) => ({
  root: {
    minHeight: "100vh",
    maxWidth: "100vw",
    width: "100%",
  },
  main: {
    width: "100%",
    display: "flex",
    minHeight: "calc(100vh - 72px)",

    [breakpoints.down("xs")]: {
      minHeight: "calc(100vh - 110px)",
    },
  },
  content: {
    width: "100%",
    height: "100%",
    minHeight: "calc(100vh - 72px)",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    transition: ".5s ease width",

    [breakpoints.down("xs")]: {
      minHeight: "calc(100vh - 110px)",
    },
  },
}))

const Layout = ({ children }) => {
  const classes = styles()

  return (
    <main className={classes.root}>
      <Navbar />

      <div className={classes.main}>
        <Sidebar />

        <div className={classes.content}>{children}</div>
      </div>
    </main>
  )
}

export default Layout
