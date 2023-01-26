// import { FiLogIn } from "react-icons/fi"
import { BiUserCircle } from "react-icons/bi"
import { GiPodiumWinner } from "react-icons/gi"
import { HiOutlineMenuAlt1 } from "react-icons/hi"
import { IoIosAddCircleOutline } from "react-icons/io"

const data = [
  // {
  //   Icon: FiLogIn,
  //   link: "Iniciar sesión",
  //   href: "/iniciar-sesion",
  // },
  {
    Icon: BiUserCircle,
    link: "Nominados",
    href: "/",
    size: 22,
  },
  {
    Icon: GiPodiumWinner,
    link: "Ganadores",
    href: "/ganadores",
  },
  {
    Icon: HiOutlineMenuAlt1,
    link: "Lista de votos",
    href: "/votar",
  },
  {
    Icon: IoIosAddCircleOutline,
    link: "Votar",
    href: "/nuevo-voto",
  },
]

export default data
