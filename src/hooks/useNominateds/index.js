import { useState, useEffect } from "react"
import { filter } from "lodash"
import useAppSelector from "src/hooks/useAppSelector"
import useNewVote from "src/hooks/useNewVote"

const useNominateds = ({ isWinners = false }) => {
  const [nominateds, setNominateds] = useState([])
  const [resultsBool, setResultsBool] = useState(false)
  const [countStep, setCountStep] = useState(0)
  const [step, setStep] = useState(0)

  const fetchReady = useAppSelector((s) => s.generics.fetchReady)
  const nominatedsRedux = useAppSelector((s) => s.generics.nominateds)
  const categories = useAppSelector((s) => s.generics.categories)
  const { values: valuesVotes } = useNewVote()
  const { votes, isNewVote } = valuesVotes

  const category = categories[step]
  const handleNextDisabled = isNewVote && !(votes?.length - 1 === step)
  const handleNext = () => setStep((prev) => prev + 1)
  const handleBack = () => setStep((prev) => prev - 1)

  const validateWinners = async () => {
    // Validate winners
    const dataWinners = filter(nominatedsRedux, (n) => n.winner === true)

    setNominateds(isWinners ? dataWinners : nominatedsRedux)
    if (dataWinners.length > 0) setResultsBool(true)
  }

  useEffect(() => {
    if (nominatedsRedux?.length > 0) validateWinners()
  }, [nominatedsRedux])

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
    fetchReady,
    categories,
    handleNextDisabled,
  }

  return {
    actions,
    values,
  }
}

export default useNominateds
