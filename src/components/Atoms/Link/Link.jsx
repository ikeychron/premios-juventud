import React from "react"
import clsx from "clsx"
import RouteLink from "next/link"

import styles from "./styles"

const Link = ({
  href = "",
  normal,
  label,
  children,
  className,
  disabled,
  style,
  onClick = () => {},
  ...rest
}) => {
  const classes = styles()

  const classnames = clsx({
    [classes.default]: true,
    [className]: !!className,
  })

  if (!normal) {
    return (
      <RouteLink href={!disabled && href} {...rest}>
        <a className={classnames} style={style} onClick={onClick}>
          {children}
        </a>
      </RouteLink>
    )
  }

  return (
    <a href={!disabled ? href : null} className={classnames} {...rest}>
      {children}
    </a>
  )
}

export default Link
