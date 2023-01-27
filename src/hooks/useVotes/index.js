import { useEffect } from "react"
// import { useDispatch } from "react-redux"
import { filter } from "lodash"
import { useRouter } from "next/router"
// import { useToast } from "@chakra-ui/react"
import useAppSelector from "../useAppSelector"
import useDB from "../useDB"

const useVotes = () => {
  const nominateds = useAppSelector((s) => s.generics.nominateds)
  const categories = useAppSelector((s) => s.generics.categories)
  const votes = useAppSelector((s) => s.generics.votes)

  const { getVotes } = useDB()

  const { push } = useRouter()

  useEffect(() => {
    if (!votes.length > 0) {
      getVotes()
    }
  }, [votes])

  const handleWinners = async () => {
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

      // Update DB
      // forEach(nominatedsToUpdate, async (n) => {
      //   const winnerExist = filter(winners, (cu) => cu.id === n.id)

      //   await updateDoc(
      //     { ...n, winner: !isEmpty(winnerExist) },
      //     "nominateds",
      //     n.id
      //   )
      // })
      // push("/ganadores")
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

  const actions = {
    handleWinners,
    handleReset,
  }

  const values = {
    votes,
  }

  return {
    actions,
    values,
  }
}

export default useVotes
