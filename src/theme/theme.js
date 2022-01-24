// Material UI Theme
import { createMuiTheme } from "@material-ui/core/styles"

import overrides from "./overrides"
import palette from "./palette"
import utils from "./utils"
import fonts from "./fonts"
import typography from "./typography"

export default createMuiTheme({
  overrides,
  palette,
  utils,
  fonts,
  typography,
})
