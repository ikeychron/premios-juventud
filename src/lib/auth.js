import { useState, useEffect, useContext, createContext } from "react"
import Router from "next/router"
import { isEmpty } from "lodash"

import firebase from "./firebase"
import { createUser } from "./db"

const auth = firebase.auth()
const db = firebase.firestore()

const response = (message, success) => ({ message, success })

const authContext = createContext()

export const useAuth = () => {
  return useContext(authContext)
}

export function AuthProvider({ children }) {
  const authValue = useProvideAuth()
  return (
    <authContext.Provider value={authValue}>{children}</authContext.Provider>
  )
}

function useProvideAuth() {
  const [user, setUser] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const handleUser = async (rawUser = false) => {
    if (rawUser) {
      console.log(rawUser)
      const user = await formatUser(rawUser)
      const { /* token */ ...userWithoutToken } = user
      createUser(user.uid, userWithoutToken)

      setUser(user)

      setLoading(false)
      return user
    } else {
      setUser(false)

      setLoading(false)
      return false
    }
  }

  const signUp = async ({ name, dni, email, password }) => {
    setLoading(true)

    try {
      const Users = await db.collection("users")

      // Get Users
      const userRepeatDni = []
      const userRepeatEmail = []

      await Users.where("dni", "==", dni)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            userRepeatDni.push(doc.data())
          })
        })
      await Users.where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            userRepeatEmail.push(doc.data())
          })
        })

      if (!isEmpty(userRepeatDni)) {
        return response({ dni: "El DNI ya está en uso" }, false)
      }

      if (!isEmpty(userRepeatEmail)) {
        return response(
          { email: "El correo electrónico ya está en uso" },
          false
        )
      }

      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      await user.updateProfile({ displayName: name })

      const { token, ...userWithoutToken } = formatUser(user)
      await createUser(user.uid, { ...userWithoutToken, dni })

      setLoading(false)
      Router.push("/")
    } catch (error) {
      console.error("Sign Up ->", error)
      setLoading(false)
    }
  }

  const signOut = () => {
    auth.signOut().then(() => {
      handleUser(false)
      Router.push("/iniciar-sesion")
    })
  }

  useEffect(() => {
    // If change token
    const unsubscribe = auth.onIdTokenChanged(handleUser)

    return () => unsubscribe()
  }, [])

  return {
    user,
    isLoading,
    signUp,
    handleUser,
    signOut,
  }
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.Aa,
    provider: user.providerData[0].providerId,
  }
}
