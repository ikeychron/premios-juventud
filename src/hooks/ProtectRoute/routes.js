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
    pathname: "/nominados/[id]",
    type: "public",
  },
  {
    pathname: "/ganadores",
    type: "public",
  },
  {
    pathname: "/buscar",
    type: "public",
  },
  // type: private
  {
    pathname: "/votar",
    type: "private",
  },
]
