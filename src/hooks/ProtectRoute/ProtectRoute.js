import { useEffect } from "react"
import filter from "lodash/filter"

// Next
import { useRouter } from "next/router"

// Auth
import { useAuth } from "src/lib/auth"

// Redux
// import { useDispatch } from "react-redux"
// import { closeSidebar } from "src/store/modules/layout/actions"

import routes from "./routes"

const ProtectRoute = ({ children }) => {
  // Auth
  const { user, isLoading } = useAuth()

  const { push, pathname, events } = useRouter()
  const filterRoute = (url = pathname) =>
    filter(routes, (r) => r.pathname === url)[0]

  // const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading) {
      // Check that a new route is OK
      const handleRouteChange = async (url) => {
        // If change of route, close sidebar
        // dispatch(closeSidebar())

        const routeType = filterRoute(url)?.type

        if (routeType !== undefined) {
          if (routeType === "private" && !user) {
            push("/iniciar-sesion")
          } else if (user && routeType === "restricted") {
            push("/")
          }
        }
      }

      const routeType = filterRoute()?.type

      // Check that initial route is OK
      if (routeType !== undefined) {
        if (routeType === "private" && !user) {
          push("/iniciar-sesion")
        } else if (user && routeType === "restricted") {
          push("/")
        }
      }

      // Monitor routes
      events.on("routeChangeStart", handleRouteChange)
      return () => {
        events.off("routeChangeStart", handleRouteChange)
      }
    }
  }, [pathname, isLoading])

  // Return Loader
  if (isLoading) return null
  return <>{children}</>
}

export default ProtectRoute
