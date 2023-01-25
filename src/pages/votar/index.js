import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { forEach, filter, isEqual, reduce, isEmpty } from "lodash"
import {
  Container,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  Card,
  Button,
} from "@chakra-ui/react"

import useAppSelector from "src/hooks/useAppSelector"

// Styles
// const styles =  (({ palette, breakpoints }) => ({
//   root: {
//     minHeight: "calc(100vh - 72px)",
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//     backgroundColor: palette.primary.main,

//     [breakpoints.down("xs")]: {
//       minHeight: "calc(100vh - 110px)",
//     },
//   },
//   container: {
//     marginTop: 40,
//     display: "flex",
//     width: "100%",
//     height: "100%",
//     flexDirection: "column",
//   },
//   buttons: {
//     marginTop: 20,
//     display: "flex",
//     width: "100%",

//     "& button": {
//       marginRight: 10,
//     },
//   },
//   head: {
//     backgroundColor: palette.primary.light,
//     color: palette.secondary.main,
//   },
//   error: {
//     marginTop: 20,
//   },
// }))

const VotePage = () => {
  // const classes = styles()
  const [votes, setVotes] = useState([])

  const nominateds = useAppSelector((s) => s.generics.nominateds)
  const categories = useAppSelector((s) => s.generics.categories)

  const { push } = useRouter()

  const getVotes = async () => {
    const dataV = []
    setVotes(dataV)
  }

  useEffect(() => {
    getVotes()
  }, [])

  const handleClick = async () => {
    const newNominates = [...nominateds]

    try {
      // Order all votes
      const allVotes = []
      forEach(votes, (v) => allVotes.push(...v.votes))

      //  Order all nominateds to update
      const nominatedsToUpdate = []
      forEach(newNominates, (n) => {
        const newVotes = filter(allVotes, (v) => n.id === v.id).length

        if (!isEqual(newVotes, n.votes)) {
          nominatedsToUpdate.push({ ...n, votes: newVotes })
        }
      })

      // Order nominateds to update by category
      const nominatedsByCategory = []
      forEach(categories, (c) => {
        const nbc = filter(
          nominatedsToUpdate,
          (ntu) => ntu.category === c.nameId
        )

        nominatedsByCategory.push(nbc)
      })

      // Choose winners
      const winners = []
      forEach(nominatedsByCategory, (c) => {
        const winner = reduce(c, function (first, second) {
          return first.votes > second.votes ? first : second
        })
        winners.push(winner)
      })

      console.log({ winners, nominatedsByCategory })

      // Update DB
      forEach(nominatedsToUpdate, async (n) => {
        const winnerExist = filter(winners, (cu) => cu.id === n.id)

        await updateDoc(
          { ...n, winner: !isEmpty(winnerExist) },
          "nominateds",
          n.id
        )
      })
      push("/ganadores")
    } catch (error) {
      console.error("Update doc ->", error)
    }
  }

  const handleReset = async () => {
    try {
      // Update DB
      forEach(nominateds, async (n) => {
        // await updateDoc({ ...n, votes: 0, winner: false }, "nominateds", n.id)
      })

      forEach(votes, async (v) => {
        // await deleteDoc("votes", v.id)
      })

      getVotes()
    } catch (error) {
      console.error("Update doc ->", error)
    }
  }

  return (
    <div>
      <Container>
        <Card>
          <Table aria-label="simple table">
            <Thead>
              <Tr>
                <Td>Nombres de votantes</Td>
              </Tr>
            </Thead>
            <Tbody>
              {votes.length > 0 ? (
                votes.map((row) => (
                  <Tr
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <Td scope="row">{row.name}</Td>
                  </Tr>
                ))
              ) : (
                <Tr sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <Td scope="row">No hay votantes aún.</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Card>
        <div>
          <Button
            onClick={() => {}}
            disabled
            color="secondary"
            variant="contained"
          >
            No puedes crear usuarios falsos o duplicados, dichos usuarios junto
            con sus votos quedarían eliminados.
          </Button>
        </div>
        <div>
          <Button
            onClick={() => push("/nuevo-voto")}
            color="secondary"
            variant="contained"
            disabled
          >
            Nuevo voto
          </Button>

          {user && (
            <>
              {votes.length > 2 ? (
                <>
                  <Button
                    onClick={handleClick}
                    color="secondary"
                    variant="contained"
                  >
                    Generar resultado
                  </Button>
                  <Button
                    onClick={handleReset}
                    color="secondary"
                    variant="contained"
                  >
                    Reiniciar datos
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {}}
                  disabled
                  color="secondary"
                  variant="contained"
                >
                  Deben haber al menos 5 votantes para generar un resultado
                </Button>
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  )
}

export default VotePage
