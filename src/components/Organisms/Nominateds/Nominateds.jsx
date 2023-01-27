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
import useNewVote from "src/hooks/useNewVote"
import renderIcon from "src/utils/renderIcon"

const Nominateds = ({ isWinners, isNewVote }) => {
  const { actions, values } = useNominateds({ isWinners })
  const { actions: actionsVotes, values: valuesVotes } = useNewVote({
    isWinners,
  })
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

  const { handleSubmit } = actionsVotes
  const { loading } = valuesVotes

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
        <Box
          display="flex"
          alignItems="center"
          mb="30px"
          justifyContent={["center", "center", "flex-start"]}
        >
          <Heading as="h1" size={"md"} color="white" mr="8px" mb="5px">
            Nominados a {category.name}
          </Heading>
          {createElement(renderIcon(category.id), {
            size: 30,
            color: step > 1 ? "#fff" : null,
          })}
        </Box>
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
              isNewVote={isNewVote}
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

        <ButtonGroup spacing="6px" width="100%" justifyContent="center">
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
            <Button onClick={handleNext} size={["sm", "md"]}>
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
      </div>
    </Box>
  )
}

export default Nominateds
