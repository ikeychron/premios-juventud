import { useState } from "react"

// Icons
import { FiEye, FiEyeOff } from "react-icons/fi"

// Material UI
import {
  InputGroup,
  InputLeftElement,
  Input as InputBase,
  InputRightElement,
} from "@chakra-ui/react"

const Input = ({
  type,
  classNameIcon,
  startAdornment,
  endAdornment,
  ...rest
}) => {
  const [icon, setIcon] = useState(true)

  const changeIcon = () => {
    setIcon(!icon)
  }

  const validateType = type === "password" ? (icon ? "password" : "text") : type // eslint-disable-line
  const validateShowIconEyes = type && type === "password"

  return (
    <InputGroup>
      {startAdornment && (
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children={startAdornment}
        />
      )}

      <InputBase type={validateType} {...rest} />

      {(endAdornment || validateShowIconEyes) && (
        <InputRightElement
          onClick={changeIcon}
          children={
            endAdornment ||
            (icon ? (
              <FiEyeOff className={classNameIcon} />
            ) : (
              <FiEye className={classNameIcon} />
            ))
          }
        />
      )}
    </InputGroup>
  )
}

export default Input
