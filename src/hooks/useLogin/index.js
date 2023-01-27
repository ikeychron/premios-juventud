import { useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import Router from "next/router"
import { useToast } from "@chakra-ui/react"

const useLogin = ({ isSignUp = false }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const toast = useToast()
  const supabase = useSupabaseClient()

  // Func SignUp
  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
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

    Router.push("/")
  }

  async function handleSignUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
      toast({
        title: "Error",
        description: error?.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      })

      console.error("Sign up ->", error)
      return
    }

    toast({
      title: "Cuenta creada",
      description: "Ahora debes confirmar tu correo electrónico",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
    Router.push("/iniciar-sesion")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignUp) {
      handleSignUp()
    } else {
      handleLogin()
    }
  }

  const actions = {
    handleSubmit,
    setEmail,
    setPassword,
  }

  const values = {
    isSignUp,
    email,
    password,
  }

  return {
    actions,
    values,
  }
}

export default useLogin
