import { Heading, Box, Image } from "@chakra-ui/react"

const Logo = ({ sizeText = "sm", sizeIcon = 5, ...rest }) => (
  <Box
    w="auto"
    display="flex"
    justifyContent="center"
    alignItems="center"
    {...rest}
  >
    <Heading as="h6" size={sizeText} mr="5px">
      Premios Juventud
    </Heading>
    <Image src="/favicon-32x32.png" alt="logo" width={sizeIcon} />
  </Box>
)

export default Logo
