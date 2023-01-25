import { Text, Box, Container, Card } from "@chakra-ui/react"
import { Logo } from "src/components/Atoms"
import LoginForm from "src/components/Organisms/LoginForm"

const LoginPage = () => {
  return (
    <Container
      maxW="container.md"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box mt="60px" mb="40px" maxW="xs" width="100%">
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
          <Text fontSize="xs">Vota por tus favoritos.</Text>
        </Card>
      </Box>
      <LoginForm />
    </Container>
  )
}

export default LoginPage
