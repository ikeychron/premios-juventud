import { useEffect, useMemo } from "react"
import { useRouter } from "next/router"
import { filter, each, reduce, isEqual, map, isEmpty } from "lodash"
import useAppSelector from "../useAppSelector"
import useDB from "../useDB"

const useVotes = () => {
  const nominateds = useAppSelector((s) => s.generics.nominateds)
  const categories = useAppSelector((s) => s.generics.categories)
  const votes = useAppSelector((s) => s.generics.votes)
  const flagNewVote = useAppSelector((s) => s.generics.featureFlags?.new_vote)

  const router = useRouter()
  const { getVotes, updateNominateds, resetNominateds, deleteVotes } = useDB()

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
      const nbc = filter(nominatedsToUpdate, (ntu) => ntu.category === c.id)
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

    // Set winner to nominates to update
    const finalNominateds = map(nominatedsToUpdate, (n) => {
      const winnerExist = filter(winners, (w) => w.id === n.id)
      return { ...n, winner: !isEmpty(winnerExist) }
    })

    updateNominateds(finalNominateds)
    router.push("/ganadores")
  }

  const handleReset = async () => {
    const newNominates = [...nominateds]

    //  Get all nominateds to delete
    const nominatedsToUpdate = []
    each(newNominates, (n) => {
      if (n.votes > 0) {
        nominatedsToUpdate.push({ ...n, votes: 0, winner: false })
      }
    })

    await resetNominateds(nominatedsToUpdate)
    await deleteVotes()
  }

  const questionsFiltereds = useMemo(() => {
    const questions = map(votes, (vote) => ({
      user: vote.name,
      questions: vote?.questions,
    }))
    const clearQuestions = filter(
      questions,
      (value) => value?.questions !== null
    )

    return clearQuestions
  }, [votes])

  const votesByNominated = useMemo(() => {
    // Go through all the votes to get the names and questions
    let allNameNominateds = []
    let nominatedsVoteds = []

    each(votes, (vote) => {
      each(vote.votes, (v) => {
        allNameNominateds = [...allNameNominateds, v.name]
        nominatedsVoteds = [...nominatedsVoteds, { ...v, user: vote.name }]
      })
    })

    // Delete repeateds nomiees by name
    const nomieesCleareds = [...new Set(allNameNominateds)]

    //  Order votes by nomiees name
    let votesByNominatedName = []
    each(nomieesCleareds, (nc) => {
      const vote = filter(nominatedsVoteds, (nv) => nv.name === nc)
      votesByNominatedName.push(vote)
    })

    return votesByNominatedName
  }, [votes])

  const actions = {
    handleWinners,
    handleReset,
  }

  const values = {
    votes,
    flagNewVote,
    questionsFiltereds,
    votesByNominated,
  }

  return {
    actions,
    values,
  }
}

export default useVotes
