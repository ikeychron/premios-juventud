import { useState } from "react"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"

// Redux
import { Provider } from "react-redux"
import store from "src/store/store"

import { ChakraProvider } from "@chakra-ui/react"
import theme from "src/theme"

// Auth Connect
import ProtectRoute from "src/hooks/ProtectRoute"

// Layout
import Head from "src/layout/Head"
import Layout from "src/layout/Layout"

import "../styles/fonts.css"
import "../styles/globals.css"

const MyApp = ({ Component, pageProps }) => {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <>
      <Head />

      {/* Redux Store */}
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <ProtectRoute>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ProtectRoute>
          </ChakraProvider>
        </Provider>
      </SessionContextProvider>
    </>
  )
}

export default MyApp
