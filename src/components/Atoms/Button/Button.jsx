import { string, func, node, bool } from "prop-types"
import clsx from "clsx"
import ButtonBase from "@material-ui/core/Button"

// Styles
import styles from "./styles"

const Button = ({
  type,
  className,
  variant = "text",
  children,
  disabled,
  onClick,
  ...rest
}) => {
  const classes = styles()

  const classnames = clsx({
    [classes.default]: true,
    [classes.text]: variant === "text",
    [className]: !!className,
  })

  return (
    <ButtonBase
      type={type}
      variant={variant}
      className={classnames}
      disabled={disabled}
      onClick={!disabled ? onClick : () => {}}
      {...rest}
    >
      {children}
    </ButtonBase>
  )
}

Button.propTypes = {
  type: string,
  className: string,
  variant: string,
  children: node,
  disabled: bool,
  onClick: func,
}

Button.defaultProps = {
  disabled: false,
}

export default Button
