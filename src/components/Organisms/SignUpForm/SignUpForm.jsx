import { useFormik } from "formik"

// Layout
import { Text, Button, Card } from "@chakra-ui/react"
import { Input, Link } from "src/components/Atoms"

// Validations
import useValidations from "src/hooks/useValidations"
import useValidationsInput from "src/hooks/useValidationsInput"

const SignUpForm = () => {
  // Validations
  const { SignUpSchema } = useValidations()
  const { funcIsError, funcIsTextError } = useValidationsInput()

  // Func SignUp
  const { signUp: SignUpFirebase } = useAuth()

  const { handleSubmit, errors, values, handleChange, touched, setErrors } =
    useFormik({
      initialValues: { name: "", dni: "", email: "", password: "" },
      onSubmit: async (values) => {
        const { success, message } = await SignUpFirebase(values)
        if (!success) {
          setErrors(message)
        }
      },
      validationSchema: SignUpSchema,
    })

  return (
    <Card>
      <Text>Crea tu cuenta</Text>

      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Nombres y apellidos"
          value={values.name}
          onChange={handleChange}
          error={funcIsError(errors.name, touched.name)}
          helperText={funcIsTextError(errors.name, touched.name)}
          color="secondary"
        />
        <Input
          name="dni"
          label="DNI"
          value={values.dni}
          onChange={handleChange}
          error={funcIsError(errors.dni, touched.dni)}
          helperText={funcIsTextError(errors.dni, touched.dni)}
          color="secondary"
        />
        <Input
          name="email"
          label="Correo electrónico"
          value={values.email}
          onChange={handleChange}
          error={funcIsError(errors.email, touched.email)}
          helperText={funcIsTextError(errors.email, touched.email)}
          color="secondary"
        />
        <Input
          name="password"
          type="password"
          label="Contraseña"
          value={values.password}
          onChange={handleChange}
          error={funcIsError(errors.password, touched.password)}
          helperText={funcIsTextError(errors.password, touched.password)}
          color="secondary"
        />
        <Button type="submit" color="secondary" variant="contained">
          Crear cuenta
        </Button>

        <div>
          <Link href="/iniciar-sesion">
            ¿Ya tienes cuenta?, inicia sesión aquí
          </Link>
        </div>
      </form>
    </Card>
  )
}

export default SignUpForm
