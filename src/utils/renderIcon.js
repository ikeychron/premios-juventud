import { FcOldTimeCamera, FcBusinessman } from "react-icons/fc"
import { AiOutlineSmile } from "react-icons/ai"
import { SiHandshake } from "react-icons/si"
import { TfiCup } from "react-icons/tfi"
import { MdGroups } from "react-icons/md"
import { GiThreeFriends } from "react-icons/gi"
import { RiShirtLine } from "react-icons/ri"

const renderIcon = (id) => {
  if (id === 1) return FcBusinessman
  if (id === 3) return FcOldTimeCamera
  if (id === 4) return SiHandshake
  if (id === 5) return TfiCup
  if (id === 6) return MdGroups
  if (id === 7) return GiThreeFriends
  if (id === 8) return AiOutlineSmile
  if (id === 9) return RiShirtLine
}

export default renderIcon
