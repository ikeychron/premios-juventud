import { string } from "prop-types"
import clsx from "clsx"
import { LazyLoadImage } from "react-lazy-load-image-component"

// Styles
import styles from "./styles"

const Image = ({ className, ...rest }) => {
  const classes = styles()

  const classnames = clsx({
    [classes.default]: true,
    [className]: !!className,
  })

  return <LazyLoadImage effect="blur" className={classnames} {...rest} />
}

Image.propTypes = {
  className: string,
}

export default Image
