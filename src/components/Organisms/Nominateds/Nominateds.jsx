import { filter, map } from "lodash"
import { BiUserCircle } from "react-icons/bi"

// Layout
import {
  Text,
  Heading,
  ButtonGroup,
  Button,
  Grid,
  Box,
  Flex,
  Progress,
  FormControl,
  FormLabel,
} from "@chakra-ui/react"
import Input from "src/components/Atoms/Input"
import NominatedItem from "src/components/Molecules/NominatedItem"
import Title from "src/components/Molecules/Title"
import useNominateds from "src/hooks/useNominateds"
import useNewVote from "src/hooks/useNewVote"

const Nominateds = () => {
  const { actions: actionsVotes, values: valuesVotes } = useNewVote()
  const { handleSubmit, handleStep, handleAddWordVote } = actionsVotes
  const { loading, votes, isNewVote } = valuesVotes

  const { actions, values } = useNominateds()
  const {
    categories,
    category,
    nominateds,
    resultsBool,
    step,
    countStep,
    handleNextDisabled,
  } = values
  const { handleNext, handleBack } = actions

  if (!categories.length > 0 || !nominateds.length > 0) {
    return (
      <Box>
        <Text>Obteniendo nominados, espera...</Text>
      </Box>
    )
  }

  const valueProgress = votes?.length / (countStep + 1)

  const validateColor = () => {
    if (valueProgress === 1) {
      return "green"
    } else if (valueProgress > 0.75) {
      return "yellow"
    } else if (valueProgress > 0.5) {
      return "orange"
    } else if (valueProgress > 0.25) {
      return "pink"
    }
    return "red"
  }

  return (
    <Box>
      <Box>
        <Title title={`Nominados a ${category.name}`} Icon={BiUserCircle} />
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={6}
          minH="550px"
        >
          {filter(
            nominateds,
            (nominated) => nominated.category === category.id
          ).map((nominated) => (
            <NominatedItem
              key={nominated.id}
              nominated={nominated}
              resultsBool={resultsBool}
            />
          ))}
        </Grid>
        <Flex
          width="100%"
          justifyContent="center"
          gap="15px"
          my="30px"
          alignItems="center"
        >
          {map(categories, (item, i) => (
            <Box
              key={item.id}
              boxSize={i === step ? "12px" : "8px"}
              borderRadius="full"
              transition="all .4s ease"
              bg={i === step ? "primary.500" : "white"}
            />
          ))}
        </Flex>

        {!handleNextDisabled && isNewVote && (
          <FormControl mb="20px">
            <FormLabel color="white" htmlFor="defineWord">
              ¿Define a {votes[step]?.name} con una palabra?
            </FormLabel>
            <Input
              name="defineWord"
              onChange={(e) => handleAddWordVote(e.target.value, step)}
              placeholder="Ej: Divertido"
              required
              bg="white"
              size="lg"
            />
          </FormControl>
        )}

        {isNewVote && (
          <Progress
            value={valueProgress * 100}
            mb="20px"
            borderRadius="sm"
            colorScheme={validateColor()}
          />
        )}

        <ButtonGroup spacing="6px" width="100%" justifyContent="center">
          {step === 0 && isNewVote && (
            <Button
              onClick={() => handleStep(1)}
              colorScheme="yellow"
              size={["sm", "md"]}
            >
              Volver a mis preguntas
            </Button>
          )}
          {step > 0 && (
            <Button
              onClick={handleBack}
              colorScheme="yellow"
              size={["sm", "md"]}
            >
              Anterior categoría
            </Button>
          )}
          {step < countStep && (
            <Button
              onClick={handleNext}
              size={["sm", "md"]}
              isDisabled={handleNextDisabled}
            >
              Siguiente categoría
            </Button>
          )}
          {step === countStep && isNewVote && (
            <Button
              onClick={handleSubmit}
              size={["sm", "md"]}
              isLoading={loading}
            >
              Realizar votos
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Box>
  )
}

export default Nominateds
