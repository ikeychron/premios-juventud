import { makeStyles } from "@material-ui/core"

export default makeStyles(({ palette, fonts }) => ({
  default: {
    fontSize: "18px",
    color: palette.secondary.main,
    margin: 0,
  },

  title: {
    fontWeight: 600,
    color: palette.secondary.main,
    fontSize: "26px",
    fontFamily: fonts.secondary,
  },
}))
