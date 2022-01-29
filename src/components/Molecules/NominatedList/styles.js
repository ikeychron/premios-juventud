import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(({ palette, breakpoints, shadows }) => ({
  root: {
    width: "100%",
    height: 350,
    borderRadius: 5,
    display: "flex",

    [breakpoints.down("xs")]: {
      height: 320,
    },

    "&:last-child": {
      marginBottom: 20,
    },
  },
  rootSelected: {
    filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.7))",
  },
  rootNotSelected: {
    filter: "grayscale(1)",
  },
  nominated: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",

    "& > span": {
      display: "flex !important",
      width: "100%",

      "& > img": {
        width: "100%",
        height: 220,
      },
    },

    [breakpoints.down("xs")]: {
      flexDirection: "column",

      "& img": {
        width: "100%",
        height: 160,
      },
    },
  },
  content: {
    width: "100%",
    height: "100%",
    overflowY: "scrollbar",
    display: "flex",
    flexDirection: "column",
    backgroundColor: palette.primary.lighter,
  },
  title: {
    color: palette.secondary.main,
    fontSize: 20,
  },
  votes: {
    color: palette.secondary.main,
    fontSize: 16,
    alignSelf: "flex-end",
    marginRight: 25,
  },
}))
