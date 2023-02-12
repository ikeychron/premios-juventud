import { useState, useEffect } from "react"
import { some } from "lodash"
import useAppSelector from "src/hooks/useAppSelector"
import useNewVote from "src/hooks/useNewVote"

const useNominateds = () => {
  const [resultsBool, setResultsBool] = useState(false)
  const [countStep, setCountStep] = useState(0)
  const [step, setStep] = useState(0)

  const nominateds = useAppSelector((s) => s.generics.nominateds)
  const categories = useAppSelector((s) => s.generics.categories)
  const { values: valuesVotes } = useNewVote()
  const { votes, isNewVote } = valuesVotes

  const category = categories[step]
  const handleNextDisabled = isNewVote && !(votes?.length - 1 === step)
  const handleNext = () => setStep((prev) => prev + 1)
  const handleBack = () => setStep((prev) => prev - 1)

  useEffect(() => {
    // Validate winners
    if (nominateds?.length > 0) {
      const boolWinners = some(nominateds, { winner: true })
      if (boolWinners) setResultsBool(true)
    }
  }, [nominateds])

  useEffect(() => {
    // Calc steps
    setCountStep(categories?.length - 1)
  }, [categories])

  const actions = {
    handleNext,
    handleBack,
  }

  const values = {
    category,
    nominateds,
    resultsBool,
    step,
    countStep,
    categories,
    handleNextDisabled,
  }

  return {
    actions,
    values,
  }
}

export default useNominateds
