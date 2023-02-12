import { useEffect } from "react"
// import filter from "lodash/filter"
// import { useSession } from "@supabase/auth-helpers-react"

// Next
// import { useRouter } from "next/router"

// Auth
import useDB from "src/hooks/useDB"

// import routes from "./routes"

const ProtectRoute = ({ children }) => {
  // Auth
  const { getNominateds, getCategories, getFlags } = useDB()

  // const session = useSession()

  // const { pathname, events, push } = useRouter()
  // const filterRoute = (url = pathname) =>
  //   filter(routes, (r) => r.pathname === url)[0]

  useEffect(() => {
    getNominateds()
    getCategories()
    getFlags()
  }, [])

  // useEffect(() => {
  //   // Check that a new route is OK
  //   const handleRouteChange = async (url) => {
  //     // If change of route, close sidebar
  //     // dispatch(closeSidebar())
  //     const routeType = filterRoute(url)?.type
  //     if (routeType !== undefined) {
  //       if (routeType === "private" && !session?.access_token) {
  //         push("/iniciar-sesion")
  //       } else if (session?.access_token && routeType === "restricted") {
  //         push("/")
  //       }
  //     }
  //   }
  //   const routeType = filterRoute()?.type
  //   // Check that initial route is OK
  //   if (routeType !== undefined) {
  //     if (routeType === "private" && !session?.access_token) {
  //       push("/iniciar-sesion")
  //     } else if (session?.access_token && routeType === "restricted") {
  //       push("/")
  //     }
  //   }
  //   // Monitor routes
  //   events.on("routeChangeStart", handleRouteChange)

  //   return () => {
  //     events.off("routeChangeStart", handleRouteChange)
  //   }
  // }, [session])

  return <>{children}</>
}

export default ProtectRoute
