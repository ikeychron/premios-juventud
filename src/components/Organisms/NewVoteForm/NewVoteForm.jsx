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
  const { handleAddVote, handleName, handleNext, handleSubmit } = actions
  const { name, votes, step } = values

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

          <Button onClick={handleNext} size="md" isDisabled={name.length < 6}>
            Siguiente
          </Button>
        </Box>
      )}
      {step === 2 && (
        <Nominateds
          isNewVote
          votes={votes}
          handleAddVote={handleAddVote}
          handleSubmit={handleSubmit}
        />
      )}
    </Box>
  )
}

export default NewVoteForm
