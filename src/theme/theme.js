// Material UI Theme
import { createTheme } from "@material-ui/core/styles"

import overrides from "./overrides"
import palette from "./palette"
import utils from "./utils"
import fonts from "./fonts"
import typography from "./typography"

export default createTheme({
  overrides,
  palette,
  utils,
  fonts,
  typography,
})
