// Layout
import NewVoteForm from "src/components/Organisms/NewVoteForm"
import { useMediaQuery, Text } from "@chakra-ui/react"

// Styles
// const styles =  (({ palette, breakpoints, fonts }) => ({
//   root: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     backgroundColor: palette.secondary.main,
//   },
//   contentImage: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "20px 0",

//     "& > h1": {
//       color: palette.primary.main,
//       fontSize: 50,
//       fontFamily: fonts.secondary,
//       lineHeight: 1.4,
//     },

//     "& > p": {
//       color: palette.primary.main,
//       [breakpoints.down("xs")]: {
//         fontSize: 14,
//         padding: "0 20px",
//       },
//     },
//   },
// }))

const NewVotePage = () => {
  const classes = styles()
  const match = useMediaQuery()

  return (
    <div>
      <NewVoteForm />
      <div>
        {!match && <Text>Premios Juventud</Text>}
        <Text>Vota por tus favoritos</Text>
      </div>
    </div>
  )
}

export default NewVotePage
