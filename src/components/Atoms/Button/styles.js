import { makeStyles } from "@material-ui/core"

export default makeStyles((Theme) => ({
  default: {
    fontSize: "16px",
    minWidth: "auto",
  },
  text: {
    color: Theme.palette.primary.main,
    textDecoration: "none",
    background: "none",
  },
}))
