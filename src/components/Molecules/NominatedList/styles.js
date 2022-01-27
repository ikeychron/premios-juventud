import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(({ palette, breakpoints, shadows }) => ({
  root: {
    width: "100%",
    minHeight: 125,
    borderRadius: 5,
    display: "flex",

    [breakpoints.down("xs")]: {
      minHeight: 290,
    },

    "&:last-child": {
      marginBottom: 20,
    },
  },
  product: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",

    "& > span": {
      display: "flex !important",
      width: "100%",

      "& > img": {
        width: "100%",
        height: 400,
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
  actions: {
    height: 80,
    display: "flex",
    justifyContent: "flex-end",
  },
  /* button: {
    color: palette.secondary.main,
    backgroundColor: palette.secondary.main,
    width: 200,
    height: 40,
    marginRight: 10,
    borderRadius: 50,
    boxShadow: "none",

    "&:hover": {
      backgroundColor: palette.primary.main,
      boxShadow: "none ",
    },

    "&:active": {
      boxShadow: "none ",
    },
  }, */
  title: {
    color: palette.secondary.main,
    fontSize: 20,
  },
  subtitle: {
    color: palette.secondary.main,
    fontSize: 16,
    marginTop: 4,
    marginBottom: 8,
  },
  company: {
    color: palette.secondary.main,
    fontSize: 14,
  },
  price: {
    color: palette.secondary.main,
    fontSize: 16,
    alignSelf: "flex-end",
    marginRight: 25,
  },
}))
