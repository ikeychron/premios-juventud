import { useEffect } from "react"
import { filter, each, reduce, isEqual } from "lodash"
import useAppSelector from "../useAppSelector"
import useDB from "../useDB"

const useVotes = () => {
  const nominateds = useAppSelector((s) => s.generics.nominateds)
  const categories = useAppSelector((s) => s.generics.categories)
  const votes = useAppSelector((s) => s.generics.votes)

  const { getVotes, deleteVotes, updateNominated, resetNominateds } = useDB()

  useEffect(() => {
    if (!votes.length > 0) {
      getVotes()
    }
  }, [votes])

  const handleWinners = () => {
    const newNominates = [...nominateds]

    // Order all votes
    const allVotes = []
    each(votes, (v) => allVotes.push(...v.votes))

    //  Order all nominateds to update
    const nominatedsToUpdate = []
    each(newNominates, (n) => {
      const newVotes = filter(allVotes, (v) => n.id === v.id).length

      if (!isEqual(newVotes, n.votes)) {
        nominatedsToUpdate.push({ ...n, votes: newVotes })
      }
    })

    // Order nominateds to update by category
    const nominatedsByCategory = []
    each(categories, (c) => {
      const nbc = filter(nominatedsToUpdate, (ntu) => ntu.category === c.nameId)
      nominatedsByCategory.push(nbc)
    })

    // Choose winners
    const winners = []
    each(nominatedsByCategory, (c) => {
      const winner = reduce(c, function (first, second) {
        return first.votes > second.votes ? first : second
      })
      winners.push(winner)
    })

    updateNominated({ ...winners }, n.id)
    push("/ganadores")
  }

  const handleReset = () => {
    resetNominateds()
    deleteVotes()
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
