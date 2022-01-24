import { makeStyles } from "@material-ui/core"

export default makeStyles((Theme) => ({
  default: {
    fontSize: "16px",
    color: Theme.palette.primary.main,
    display: "inline-block",
    verticalAlign: "middle",
    textDecoration: "none",
    textTransform: "none",
    cursor: "pointer",
  },
}))
