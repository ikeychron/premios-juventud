import { useState } from "react"
import { useDispatch } from "react-redux"
import { find, filter } from "lodash"
import { useRouter } from "next/router"
import { useToast } from "@chakra-ui/react"
import useAppSelector from "src/hooks/useAppSelector"
import {
  setFormNameVotes,
  setFormVotes,
  setStepVotes,
} from "src/store/slices/generics"

import useDB from "../useDB"

const useNewVote = () => {
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const toast = useToast()
  const { createVote } = useDB()

  const { push } = useRouter()

  const categories = useAppSelector((s) => s.generics.categories)
  const name = useAppSelector((s) => s.generics.voteForm.name)
  const votes = useAppSelector((s) => s.generics.voteForm.votes)
  const step = useAppSelector((s) => s.generics.voteForm.step)

  const handleName = (value) => dispatch(setFormNameVotes(value))

  const handleQuestions = () => {
    dispatch(setStepVotes(1))
  }

  const handleSelectNominateds = () => {
    dispatch(setStepVotes(2))
  }

  const clearAll = () => {
    dispatch(setStepVotes(1))
    dispatch(setFormVotes([]))
    handleName("")
  }

  const handleAddVote = (nominated) => {
    // Validate a nominated by category
    const nominateExist = find(votes, (v) => nominated.category === v.category)
    if (!nominateExist) {
      dispatch(setFormVotes([...votes, nominated]))
    } else {
      dispatch(
        setFormVotes([
          ...filter(votes, (v) => v.id !== nominateExist.id),
          nominated,
        ])
      )
    }
  }

  const handleSubmit = () => {
    setLoading(true)

    if (votes.length === categories.length) {
      createVote({ name, votes })
      push("/lista-de-votos")
      setLoading(false)
    } else {
      toast({
        title: "Error",
        description: "Te hacen falta votos en alguna categoría",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
    setLoading(false)
  }

  const actions = {
    handleAddVote,
    handleSubmit,
    handleName,
    handleSelectNominateds,
    handleQuestions,
    clearAll,
  }

  const values = {
    name,
    votes,
    loading,
    step,
  }

  return {
    actions,
    values,
  }
}

export default useNewVote
