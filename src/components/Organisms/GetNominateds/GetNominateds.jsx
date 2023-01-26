import { createElement, useEffect, useState } from "react"
import useAppSelector from "src/hooks/useAppSelector"
import { filter, map } from "lodash"
import { FcOldTimeCamera, FcBusinessman, FcClock } from "react-icons/fc"
import { AiOutlineSmile } from "react-icons/ai"
import { SiHandshake } from "react-icons/si"
import { TfiCup } from "react-icons/tfi"
import { MdGroups } from "react-icons/md"
import { GiThreeFriends } from "react-icons/gi"
import { RiShirtLine } from "react-icons/ri"
import { FaDog } from "react-icons/fa"

// Layout
import {
  Container,
  Text,
  Heading,
  ButtonGroup,
  Button,
  Grid,
  Box,
  Flex,
} from "@chakra-ui/react"
import NominatedList from "src/components/Molecules/NominatedList"

const GetNominateds = ({ isNewVote, votes, handleAddVote, isWinners }) => {
  const [nominateds, setNominateds] = useState([])
  const [resultsBool, setResultsBool] = useState(false)
  const [countStep, setCountStep] = useState(0)
  const [step, setStep] = useState(0)

  const fetchReady = useAppSelector((s) => s.generics.fetchReady)
  const nominatedsRedux = useAppSelector((s) => s.generics.nominateds)
  const categories = useAppSelector((s) => s.generics.categories)

  console.log(nominatedsRedux, categories)

  const filterNominateds = async () => {
    // Validate winners
    const dataWinners = filter(nominatedsRedux, (n) => n.winner === true)

    setNominateds(isWinners ? dataWinners : nominatedsRedux)
    if (dataWinners.length > 0) setResultsBool(true)
  }

  useEffect(() => {
    if (nominatedsRedux?.length > 0) filterNominateds()
  }, [nominatedsRedux])

  useEffect(() => {
    setCountStep(categories?.length - 1)
  }, [categories])

  const category = categories[step]

  if (!categories.length > 0 || !nominateds.length > 0) {
    return (
      <Container mt="40px">
        {!fetchReady ? (
          <>
            {isWinners ? (
              <Text>No hay ganadores aún.</Text>
            ) : (
              <Text>Obteniendo nominados, espera...</Text>
            )}
          </>
        ) : (
          <Text>
            Lo sentimos, ya se ha llegado al límite diario de consultas a la
            página, vuelve mañana para seguir disfrutando.
          </Text>
        )}
      </Container>
    )
  }

  const Icons = [
    FcBusinessman,
    FcOldTimeCamera,
    SiHandshake,
    TfiCup,
    MdGroups,
    GiThreeFriends,
    AiOutlineSmile,
    RiShirtLine,
    FaDog,
  ]

  return (
    <Container my="40px" maxW="container.md">
      <div>
        <Box display="flex" alignItems="center" mb="30px">
          <Heading as="h1" size="lg" color="white" mr="8px" mb="5px">
            Nominados a {category.name}
          </Heading>
          {createElement(Icons[step], {
            size: 30,
            color: step > 1 ? "#fff" : null,
          })}
        </Box>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {filter(
            nominateds,
            (nominated) => nominated.category === category.id
          ).map((nominated) => (
            <NominatedList
              nominated={nominated}
              key={nominated.id}
              isNewVote={isNewVote}
              votes={votes}
              handleAddVote={handleAddVote}
              isWinners={isWinners}
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

        <ButtonGroup spacing="6" width="100%" justifyContent="center">
          {step > 0 && (
            <Button
              onClick={() => setStep((prev) => prev - 1)}
              colorScheme="yellow"
              size="md"
            >
              Anterior categoría
            </Button>
          )}
          {step < countStep && (
            <Button onClick={() => setStep((prev) => prev + 1)} size="md">
              Siguiente categoría
            </Button>
          )}
        </ButtonGroup>
      </div>
    </Container>
  )
}

export default GetNominateds
