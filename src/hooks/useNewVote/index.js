import { useState } from "react"
import { useDispatch } from "react-redux"
import { find, filter, some } from "lodash"
import { useRouter } from "next/router"
import { useToast } from "@chakra-ui/react"
import useAppSelector from "src/hooks/useAppSelector"
import {
  setFormNameVotes,
  setFormVotes,
  setStepVotes,
  setQuestionVotes,
} from "src/store/slices/generics"

import useDB from "../useDB"

const useNewVote = () => {
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const toast = useToast()
  const { createVote } = useDB()

  const { push, pathname } = useRouter()

  const isNewVote = pathname === "/nuevo-voto"
  const categories = useAppSelector((s) => s.generics.categories)
  const name = useAppSelector((s) => s.generics.voteForm.name)
  const votes = useAppSelector((s) => s.generics.voteForm.votes)
  const step = useAppSelector((s) => s.generics.voteForm.step)
  const churchYouth = useAppSelector(
    (s) => s.generics.voteForm.questions.churchYouth
  )
  const youngChristian = useAppSelector(
    (s) => s.generics.voteForm.questions.youngChristian
  )
  const aspireNewYear = useAppSelector(
    (s) => s.generics.voteForm.questions.aspireNewYear
  )

  const handleName = (value) => dispatch(setFormNameVotes(value))
  const validateQuestions =
    name.length < 6 ||
    churchYouth.length < 12 ||
    youngChristian.length < 12 ||
    aspireNewYear.length < 12

  const handleQuestions = (event) => {
    const { value, name } = event.target
    dispatch(setQuestionVotes({ [name]: value }))
  }

  const handleStep = (step) => {
    dispatch(setStepVotes(step))
  }

  const clearAll = () => {
    dispatch(setStepVotes(1))
    dispatch(setFormVotes([]))
    handleName("")
  }

  const handleAddVote = (nominated) => {
    const height = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight
    )
    window.scrollTo({ top: height, left: 0, behavior: "smooth" })

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

  const handleAddWordVote = (value, index) => {
    const oldNominated = votes[index]

    dispatch(
      setFormVotes([
        ...filter(votes, (v) => v.id !== oldNominated.id),
        { ...oldNominated, defineWithWord: value },
      ])
    )
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
    handleAddWordVote,
    handleSubmit,
    handleName,
    handleStep,
    handleQuestions,
    clearAll,
  }

  const values = {
    name,
    votes,
    loading,
    step,
    isNewVote,
    validateQuestions,
  }

  return {
    actions,
    values,
  }
}

export default useNewVote
