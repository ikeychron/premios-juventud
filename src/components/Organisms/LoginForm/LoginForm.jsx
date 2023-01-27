// Layout
import { Heading, Button, Card, Box, Text } from "@chakra-ui/react"
import { Input, Link } from "src/components/Atoms"
import useLogin from "src/hooks/useLogin"

const LoginForm = ({ isSignUp = false }) => {
  const { actions, values } = useLogin({ isSignUp })

  return (
    <Card p="40px" w="100%">
      <Heading as="h1" size="md" textAlign="center">
        Iniciar sesión
      </Heading>

      <Box as="form" onSubmit={actions.handleSubmit} p="20px">
        <Input
          name="email"
          placeholder="Correo electrónico"
          value={values.email}
          onChange={(e) => actions.setEmail(e.target.value)}
          mb="20px"
        />
        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={values.password}
          onChange={(e) => actions.setPassword(e.target.value)}
          mb="20px"
        />
        <Box display="flex" flexDir="column">
          <Button type="submit" size="md" mb="20px">
            <Text color="white">
              {isSignUp ? "Crear cuenta" : "Iniciar sesión"}
            </Text>
          </Button>

          <Link href={isSignUp ? "/iniciar-sesion" : "/crear-cuenta"}>
            {isSignUp ? "Ir a Iniciar Sesión" : "Ir a Crear cuenta"}
          </Link>
        </Box>
      </Box>
    </Card>
  )
}

export default LoginForm
