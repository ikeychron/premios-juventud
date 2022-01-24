export default [
  // type: restricted
  {
    pathname: "/iniciar-sesion",
    type: "restricted",
  },
  {
    pathname: "/crear-cuenta",
    type: "restricted",
  },
  // type: public
  {
    pathname: "/",
    type: "public",
  },
  {
    pathname: "/productos",
    type: "public",
  },
  {
    pathname: "/productos/[id]",
    type: "public",
  },
  {
    pathname: "/populares",
    type: "public",
  },
  {
    pathname: "/buscar",
    type: "public",
  },
  // type: private
  {
    pathname: "/nuevo-producto",
    type: "private",
  },
]
