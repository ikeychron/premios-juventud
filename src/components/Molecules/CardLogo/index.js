import { Box, Card, Text } from "@chakra-ui/react"
import { Logo } from "src/components/Atoms"

const CardLogo = () => (
  <Box mb="40px" maxW="xs" width="100%">
    <Card
      py="18px"
      px="40px"
      display="flex"
      flexDirection="column"
      align="center"
      bg="primary.500"
      color="white"
    >
      <Logo />
      <Text fontSize="xs">Vota por tus favoritos</Text>
    </Card>
  </Box>
)

export default CardLogo
