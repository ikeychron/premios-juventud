import NextLink from "next/link"
import { Button } from "@chakra-ui/react"

const Link = ({ href = "", children, variant = "link", ...props }) => {
  return (
    <Button
      as={NextLink}
      href={href}
      variant={variant}
      borderRadius="none"
      {...props}
    >
      {children}
    </Button>
  )
}

export default Link
