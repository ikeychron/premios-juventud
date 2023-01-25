import { Text, useMediaQuery } from "@chakra-ui/react"
import NominatedForm from "src/components/Organisms/NominatedForm"

// Styles
// const styles = makeStyles(({ palette, breakpoints, fonts }) => ({
//   root: {
//     height: "calc(100vh - 72px)",
//     width: "100%",
//     display: "grid",
//     gridTemplateColumns: "auto 60%",
//     alignItems: "center",
//     backgroundColor: palette.secondary.main,

//     [breakpoints.down("sm")]: {
//       gridTemplateColumns: "100%",
//       gridTemplateRows: "auto 12%",
//     },

//     [breakpoints.down("xs")]: {
//       minHeight: "calc(100vh - 110px)",
//       gridTemplateRows: "auto 8%",
//     },
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

const CreateNominatedPage = () => {
  // const classes = styles()
  const match = useMediaQuery()

  return (
    <div>
      <NominatedForm />
      <div>
        {!match && <Text>Premios Juventud</Text>}
        <Text>Vota por tus favoritos</Text>
      </div>
    </div>
  )
}

export default CreateNominatedPage
