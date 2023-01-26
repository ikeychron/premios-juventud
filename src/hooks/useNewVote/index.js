import { useState } from "react"
import { find, filter } from "lodash"
import { useRouter } from "next/router"
import { useToast } from "@chakra-ui/react"
import useAppSelector from "src/hooks/useAppSelector"

const useNewVote = () => {
  const [name, setName] = useState("")
  const [votes, setVotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const toast = useToast()

  const { push } = useRouter()

  const categories = useAppSelector((s) => s.generics.categories)

  const handleName = (value) => setName(value)

  const handleNext = () => {
    setStep(2)
  }

  const handleAddVote = (nominated) => {
    // Validate a nominated by category
    const nominateExist = find(votes, (v) => nominated.category === v.category)
    if (!nominateExist) {
      setVotes((prev) => [...prev, nominated])
    } else {
      setVotes((prev) => [
        ...filter(prev, (v) => v.id !== nominateExist.id),
        nominated,
      ])
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    if (votes.length === categories.length) {
      // const data = {
      //   name,
      //   votes,
      //   created: Date.now(),
      // }

      console.log({ votes })

      try {
        // await createDoc(data, "votes")
        push("/votar")
        setLoading(false)
      } catch (error) {
        console.error("New Vote ->", error)
        setLoading(false)
      }
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
    handleNext,
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
