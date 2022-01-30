import { makeStyles } from "@material-ui/core"

export default makeStyles(({ palette, breakpoints, spacing }) => ({
  root: {
    width: "100%",
    height: 72,
    backgroundColor: palette.primary.dark,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,

    [breakpoints.down("xs")]: {
      flexDirection: "column",
      height: 110,
    },
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    [breakpoints.up("sm")]: {
      height: "100%",
      padding: 0,
    },
  },
  right: {
    marginRight: spacing(2),
  },
  menuContent: {
    height: 7,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",

    "& > div": {
      width: 20,
      height: 2,
      backgroundColor: palette.secondary.main,
    },
  },
  title: {
    color: palette.secondary.main,
    display: "flex",
    alignItems: "center",
  },
  menuButton: {
    height: 50,
    width: 50,
    marginLeft: 10,
  },
  button: {
    marginRight: 20,
    color: palette.secondary.main,
  },
}))
