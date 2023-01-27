import { extendTheme } from "@chakra-ui/react"

export const breakpoints = {
  base: "0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
}

export const colors = {
  primary: {
    700: "#A61C76",
    600: "#B23C89",
    500: "#F24484",
    400: "#CA64A6",
  },
  secondary: {
    600: "#181240",
  },
  // terceary: {
  //   600: "#F2A922",
  // },
}

export const fonts = {
  body: "'Righteous', sans serif !important",
  heading: "'Righteous', sans serif !important",
  mono: "'Montserrat', sans serif !important",
}

export default extendTheme({
  colors,
  fonts,
  styles: {
    global: () => ({
      body: {
        fontFamily: "body",
        backgroundColor: colors.secondary[600],
        backgroundImage: "url(/image-seo.jpg)",
        backgroundSize: "cover",
        backgroundBlendMode: "soft-light",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "normal",
      },
      defaultProps: {
        size: "sm",
        colorScheme: "purple",
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "normal",
      },
    },
  },
})
