import { makeStyles } from "@material-ui/core/styles"
// Util
import { widthCart } from "src/utils/widthLayouts"

export default makeStyles(({ palette, fonts, breakpoints }) => ({
  /* Cart */
  root: {
    transition: ".5s ease width",
    height: 0,
    width: 0,
  },
  drawer: {
    width: 0,
    flexShrink: 0,
    paddingTop: 75,
    transition: ".5s ease width",
    height: 0,
  },
  drawerPaper: {
    width: widthCart,
    paddingTop: 72,
    height: "100vh",
    zIndex: 10,

    [breakpoints.down("xs")]: {
      paddingTop: 110,
    },
  },
  drawerOpen: {
    width: widthCart,
  },
  /* Content */
  content: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentLinks: {
    display: "flex",
    flexDirection: "column",

    "& > div": {
      marginBottom: 5,

      "& > p": {
        textDecoration: "underline",
        marginBottom: 4,
      },

      "& > a": {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        borderBottom: `1px solid ${palette.secondary.ultraDark}`,
        width: "100%",
        display: "flex",
        alignItems: "center",
        transition: ".4s ease background",

        "&:hover": {
          backgroundColor: palette.secondary.dark,
        },

        "&:first-child": {
          borderTop: `1px solid ${palette.secondary.ultraDark}`,
        },
      },
    },
  },
}))
