// Layout
import { Text } from "src/components/Atoms"
import LoginForm from "src/components/Organisms/LoginForm"
import useMediaQuery from "@material-ui/core/useMediaQuery"

// Styles
import { makeStyles, useTheme } from "@material-ui/core/styles"
const styles = makeStyles(({ palette, breakpoints, fonts }) => ({
  root: {
    height: "calc(100vh - 72px)",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "58% auto",
    alignItems: "center",
    backgroundColor: palette.primary.main,

    [breakpoints.down("sm")]: {
      gridTemplateColumns: "100%",
      gridTemplateRows: "12% auto",
    },

    [breakpoints.down("xs")]: {
      gridTemplateRows: "8% auto",
    },
  },
  contentImage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0",

    "& > h1": {
      fontSize: 50,
      color: palette.secondary.main,
      fontFamily: fonts.secondary,
      lineHeight: 1.4,
    },

    "& > p": {
      color: palette.secondary.main,

      [breakpoints.down("xs")]: {
        fontSize: 14,
        padding: "0 20px",
      },
    },
  },
}))

const LoginPage = () => {
  const classes = styles()
  const { breakpoints } = useTheme()
  const match = useMediaQuery(breakpoints.down("sm"))

  return (
    <div className={classes.root}>
      <div className={classes.contentImage}>
        {!match && <Text component="h1">Premios Juventud</Text>}
        <Text>Vende tus productos fácil y rápido, sin ningún costo.</Text>
      </div>
      <LoginForm />
    </div>
  )
}

export default LoginPage
