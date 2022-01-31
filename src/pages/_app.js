import { useEffect } from "react"
import { func, object } from "prop-types"

// Head
import Head from "src/layout/Head"

// Redux
import { Provider } from "react-redux"
import wrapperRedux from "src/store"
import { store } from "src/store/store"

// Auth Connect
import { AuthProvider } from "src/lib/auth"
import ProtectRoute from "src/hooks/ProtectRoute"

// Material UI
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

// Layout
import Layout from "src/layout/Layout"

// Theme
import theme from "../theme"
import "../styles/fonts.css"
import "../styles/globals.css"

const MyApp = ({ Component, pageProps }) => {
  // on Mount
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  console.log("test re render app")

  return (
    <>
      <Head />

      {/* Redux Store */}
      <Provider store={store}>
        <AuthProvider>
          <ProtectRoute>
            <ThemeProvider theme={theme}>
              {/* Reset CSS */}
              <CssBaseline />

              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </ProtectRoute>
        </AuthProvider>
      </Provider>
    </>
  )
}

MyApp.propTypes = {
  Component: func,
  pageProps: object,
}

export default wrapperRedux.withRedux(MyApp)
