import { Heading, Box } from "@chakra-ui/react"
import { GiPodiumWinner } from "react-icons/gi"

const Logo = ({ sizeText = "sm", sizeIcon = 16, ...rest }) => (
  <Box
    w="auto"
    display="flex"
    justifyContent="center"
    alignItems="center"
    {...rest}
  >
    <Heading as="h6" size={sizeText}>
      Premios Juventud
    </Heading>
    <GiPodiumWinner size={sizeIcon} style={{ marginLeft: 10 }} />
  </Box>
)

export default Logo
