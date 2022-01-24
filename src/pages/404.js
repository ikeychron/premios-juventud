import { useEffect } from "react"

// Next
import Router from "next/router"

const PageNotFound = () => {
  useEffect(() => {
    Router.push("/")
  }, [])

  return null
}

export default PageNotFound
