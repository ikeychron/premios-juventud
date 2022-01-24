import clsx from "clsx"
import { get } from "lodash"
import Typography from "@material-ui/core/Typography"

import styles from "./styles"

const Text = ({ theme, className, children, ...rest }) => {
  const classes = styles()

  const classnames = clsx({
    [get(classes, theme, "default")]: true,
    [className]: !!className,
  })

  return (
    <Typography className={classnames} {...rest}>
      {children}
    </Typography>
  )
}

Text.defaultProps = {
  className: "",
  theme: "default",
}

export default Text
