import { BiUserCircle } from "react-icons/bi"
import { GiPodiumWinner } from "react-icons/gi"
import { IoIosAddCircleOutline } from "react-icons/io"

const dataAuth = [
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
    Icon: IoIosAddCircleOutline,
    link: "Votar",
    href: "/lista-de-votos",
  },
]

export default dataAuth
