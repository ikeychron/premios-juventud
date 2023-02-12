import { useEffect } from "react"
import { useRouter } from "next/router"
import {
  Box,
  Button,
  Heading,
  Card,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react"
import { Input } from "src/components/Atoms"

import useNewVote from "src/hooks/useNewVote"

import Nominateds from "../Nominateds"

const NewVoteForm = () => {
  const { actions, values } = useNewVote()
  const { handleName, handleQuestions, handleStep, clearAll } = actions
  const { name, step, validateQuestions, flagNewVote } = values
  const { push } = useRouter()

  useEffect(() => {
    return () => {
      clearAll()
    }
  }, [])

  useEffect(() => {
    if (!flagNewVote) {
      push("/lista-de-votos")
    }
  }, [flagNewVote])

  return (
    <Box>
      <Box display="flex" w="100%" justifyContent="center">
        <Box mb="40px" maxW="sm" width="100%">
          <Card
            py="18px"
            px="40px"
            display="flex"
            flexDirection="column"
            align="center"
            bg="primary.500"
            color="white"
          >
            <Heading as="h6" size="sm">
              {step === 1
                ? "Nuevo voto"
                : "Selecciona un nominado por categoría"}
            </Heading>
          </Card>
        </Box>
      </Box>

      {step === 1 && (
        <Box as="form">
          <FormControl mb="20px">
            <FormLabel color="white">
              Escribe tus nombres y apellidos:
            </FormLabel>
            <Input
              name="name"
              placeholder="Ej: Carlos Sánchez"
              value={name}
              onChange={(e) => handleName(e.target.value)}
              required
              bg="white"
              size="lg"
            />
            <FormHelperText color="yellow">
              Pedimos tu nombre para saber que si ya votaste no puedes repetir.
              <br />
              Si no eres de la misión 63 no puedes participar.
            </FormHelperText>
          </FormControl>

          <FormControl mb="20px">
            <FormLabel color="white" htmlFor="churchYouth">
              ¿Cómo defines la juventud de nuestra iglesia?
            </FormLabel>
            <Input
              name="churchYouth"
              placeholder="La defino como..."
              onChange={handleQuestions}
              required
              bg="white"
              size="lg"
            />
            <FormHelperText color="yellow">
              Debes escribir mínimo 12 cáracteres
            </FormHelperText>
          </FormControl>

          <FormControl mb="20px">
            <FormLabel color="white" htmlFor="youngChristian">
              ¿Qué es para ti ser joven cristiano?
            </FormLabel>
            <Input
              name="youngChristian"
              placeholder="Para mí es..."
              onChange={handleQuestions}
              required
              bg="white"
              size="lg"
            />
            <FormHelperText color="yellow">
              Debes escribir mínimo 12 cáracteres
            </FormHelperText>
          </FormControl>

          <FormControl mb="20px">
            <FormLabel color="white" htmlFor="aspireNewYear">
              ¿Qué aspiras para este 2023?
            </FormLabel>
            <Input
              name="aspireNewYear"
              placeholder="Para este 2023 aspiro..."
              onChange={handleQuestions}
              required
              bg="white"
              size="lg"
            />
            <FormHelperText color="yellow">
              Debes escribir mínimo 12 cáracteres
            </FormHelperText>
          </FormControl>

          <Button
            onClick={() => handleStep(2)}
            size="md"
            isDisabled={validateQuestions}
          >
            Siguiente
          </Button>
        </Box>
      )}
      {step === 2 && <Nominateds />}
    </Box>
  )
}

export default NewVoteForm
