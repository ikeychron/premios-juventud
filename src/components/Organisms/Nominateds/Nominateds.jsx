import { createElement } from "react"
import { filter, map } from "lodash"

// Layout
import {
  Text,
  Heading,
  ButtonGroup,
  Button,
  Grid,
  Box,
  Flex,
} from "@chakra-ui/react"
import NominatedItem from "src/components/Molecules/NominatedItem"
import useNominateds from "src/hooks/useNominateds"
import renderIcon from "src/utils/renderIcon"

const Nominateds = ({
  isNewVote,
  votes,
  handleAddVote,
  isWinners,
  handleSubmit,
}) => {
  const { actions, values } = useNominateds({ isWinners })
  const { handleNext, handleBack } = actions
  const {
    categories,
    category,
    fetchReady,
    nominateds,
    resultsBool,
    step,
    countStep,
  } = values

  if (!categories.length > 0 || !nominateds.length > 0) {
    return (
      <Box>
        {!fetchReady ? (
          <Text>Obteniendo nominados, espera...</Text>
        ) : (
          <>
            {isWinners ? (
              <Text>No hay ganadores aún.</Text>
            ) : (
              <Text>
                Lo sentimos, ya se ha llegado al límite diario de consultas a la
                página, vuelve mañana para seguir disfrutando.
              </Text>
            )}
          </>
        )}
      </Box>
    )
  }

  return (
    <Box>
      <div>
        <Box display="flex" alignItems="center" mb="30px">
          <Heading as="h1" size="lg" color="white" mr="8px" mb="5px">
            Nominados a {category.name}
          </Heading>
          {createElement(renderIcon(category.id), {
            size: 30,
            color: step > 1 ? "#fff" : null,
          })}
        </Box>
        <Grid templateColumns="repeat(4, 1fr)" gap={6} minH="550px">
          {filter(
            nominateds,
            (nominated) => nominated.category === category.id
          ).map((nominated) => (
            <NominatedItem
              nominated={nominated}
              key={nominated.id}
              isNewVote={isNewVote}
              votes={votes}
              handleAddVote={handleAddVote}
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
              boxSize={i === step ? 3 : 2}
              borderRadius="full"
              bg={i === step ? "primary.500" : "white"}
            />
          ))}
        </Flex>

        <ButtonGroup spacing="6px" width="100%" justifyContent="center">
          {step > 0 && (
            <Button onClick={handleBack} colorScheme="yellow" size="md">
              Anterior categoría
            </Button>
          )}
          {step < countStep && (
            <Button onClick={handleNext} size="md">
              Siguiente categoría
            </Button>
          )}
          {step === countStep && isNewVote && (
            <Button onClick={handleSubmit} size="md">
              Realizar votos
            </Button>
          )}
        </ButtonGroup>
      </div>
    </Box>
  )
}

export default Nominateds
