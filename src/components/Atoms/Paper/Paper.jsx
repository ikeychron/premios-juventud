import clsx from "clsx"
import PaperBase from "@material-ui/core/Paper"

import styles from "./styles"

const Paper = ({ theme, className, children, ...rest }) => {
  const classes = styles()

  const classnames = clsx({
    [classes.default]: true,
    [className]: !!className,
  })

  return (
    <PaperBase className={classnames} {...rest}>
      {children}
    </PaperBase>
  )
}

Paper.defaultProps = {
  className: "",
}

export default Paper
