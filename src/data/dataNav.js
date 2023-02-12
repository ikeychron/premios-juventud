import { BiUserCircle } from "react-icons/bi"
import { HiOutlineMenuAlt1 } from "react-icons/hi"
import { MdOutlineQuestionAnswer } from "react-icons/md"
import { AiOutlineQuestion } from "react-icons/ai"
import { IoIosAddCircleOutline } from "react-icons/io"

const dataDefault = [
  {
    Icon: BiUserCircle,
    link: "Nominados",
    href: "/",
    size: 22,
  },
  {
    Icon: HiOutlineMenuAlt1,
    link: "Lista de votos",
    href: "/lista-de-votos",
  },
]

const dataShowQuestion = [
  {
    Icon: MdOutlineQuestionAnswer,
    link: "Respuestas",
    href: "/respuestas",
  },
  {
    Icon: AiOutlineQuestion,
    link: "¿Cómo me definen?",
    href: "/como-me-definen",
  },
]

const dataNewVotes = [
  {
    Icon: IoIosAddCircleOutline,
    link: "Votar",
    href: "/nuevo-voto",
  },
]

const validateData = (showQuestions, newVote) => {
  let data = []
  if (showQuestions) {
    data = [...data, ...dataShowQuestion]
  }
  if (newVote) {
    data = [...data, ...dataNewVotes]
  }
  return data
}

const data = (showQuestions, newVote) => [
  ...dataDefault,
  ...validateData(showQuestions, newVote),
]

export default data
