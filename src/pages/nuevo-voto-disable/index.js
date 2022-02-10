// Layout
import Text from "src/components/Atoms/Text"
import NewVoteForm from "src/components/Organisms/NewVoteForm"
import useMediaQuery from "@material-ui/core/useMediaQuery"

// Styles
import { makeStyles, useTheme } from "@material-ui/core/styles"
const styles = makeStyles(({ palette, breakpoints, fonts }) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: palette.secondary.main,
  },
  contentImage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0",

    "& > h1": {
      color: palette.primary.main,
      fontSize: 50,
      fontFamily: fonts.secondary,
      lineHeight: 1.4,
    },

    "& > p": {
      color: palette.primary.main,
      [breakpoints.down("xs")]: {
        fontSize: 14,
        padding: "0 20px",
      },
    },
  },
}))

const NewVotePage = () => {
  const classes = styles()
  const { breakpoints } = useTheme()
  const match = useMediaQuery(breakpoints.down("sm"))

  return (
    <div className={classes.root}>
      <NewVoteForm />
      <div className={classes.contentImage}>
        {!match && <Text component="h1">Premios Juventud</Text>}
        <Text>Vota por tus favoritos</Text>
      </div>
    </div>
  )
}

export default NewVotePage
