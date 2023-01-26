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
    href: "/votar",
  },
  // {
  //   Icon: IoIosAddCircleOutline,
  //   link: "Crear nominado",
  //   href: "/crear-nominado",
  // },
]

export default dataAuth
