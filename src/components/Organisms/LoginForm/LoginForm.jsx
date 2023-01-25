import { useFormik } from "formik"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
// import Router from "next/router"

// Layout
import { Heading, Button, Card, Box, Text, useToast } from "@chakra-ui/react"
import { Input } from "src/components/Atoms"

// Validations
import useValidations from "src/hooks/useValidations"
import useValidationsInput from "src/hooks/useValidationsInput"
// Styles
// import { makeStyles } from "@material-ui/core/styles"
// const styles = makeStyles(({ breakpoints }) => ({
//   content: {
//     height: "100%",
//     borderRadius: 0,
//     clipPath: "polygon(17% 0, 100% 0%, 100% 100%, 0 100%)",
//     paddingLeft: "15%",
//     paddingTop: 60,

//     [breakpoints.down("sm")]: {
//       clipPath: "none",
//       padding: "0 6px",
//       paddingBottom: 40,
//     },
//   },
//   title: {
//     marginTop: 70,
//     fontSize: 34,
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   form: {
//     padding: "0 35px",
//     display: "flex",
//     flexDirection: "column",

//     [breakpoints.down("sm")]: {
//       padding: "0 85px",
//     },

//     [breakpoints.down("xs")]: {
//       padding: "0 15px",
//     },
//   },
//   contentLinks: {
//     display: "flex",
//     width: "100%",
//     justifyContent: "space-between",
//   },
//   button: {
//     marginTop: 20,
//     marginBottom: 16,
//     height: 44,
//   },
// }))

const LoginForm = () => {
  const toast = useToast()

  const { SignInSchema } = useValidations()
  const { funcIsError, funcIsTextError } = useValidationsInput()
  const supabase = useSupabaseClient()

  // Func SignUp
  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "example@email.com",
      password: "example-password",
    })
    if (error) {
      toast({
        title: "Error",
        description: error?.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      })

      console.error("Sign In ->", error)
      return
    }
    console.log(data, error)

    // Router.push("/")
  }
  const handleUser = (data) => console.log(data)

  const { handleSubmit, errors, values, handleChange, touched, setErrors } =
    useFormik({
      initialValues: { email: "", password: "" },
      onSubmit: signInWithEmail,
      validationSchema: SignInSchema,
    })

  return (
    <Card p="40px" w="100%">
      <Heading as="h1" size="md" textAlign="center">
        Iniciar sesión
      </Heading>

      <Box as="form" onSubmit={handleSubmit} p="20px">
        <Input
          name="email"
          placeholder="Correo electrónico"
          value={values.email}
          onChange={handleChange}
          // error={funcIsError(errors.email || errors.password, touched.email)}
          // helperText={funcIsTextError(errors.email, touched.email)}
          mb="20px"
        />
        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={values.password}
          onChange={handleChange}
          // error={funcIsError(errors.password, touched.password)}
          // helperText={funcIsTextError(errors.password, touched.password)}
          mb="20px"
        />
        <Button type="submit" size="md">
          <Text color="white">Iniciar sesión</Text>
        </Button>

        {/* <div >
          <Link href="/crear-cuenta">Crear cuenta</Link>
        </div> */}
      </Box>
    </Card>
  )
}

export default LoginForm
