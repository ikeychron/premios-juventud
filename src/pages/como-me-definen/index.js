import { map } from "lodash"
import { useSession } from "@supabase/auth-helpers-react"
import {
  Heading,
  Box,
  Grid,
  Card,
  Image,
  List,
  ListItem,
  ListIcon,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react"
import Title from "src/components/Molecules/Title"
import { HiOutlineChevronRight } from "react-icons/hi"
import { AiOutlineQuestion } from "react-icons/ai"
import useVotes from "src/hooks/useVotes"

const Answer = () => {
  const {
    values: { votesByNominated },
  } = useVotes()

  // Auth
  const session = useSession()

  return (
    <Box>
      <Title title="¿Cómo me definen?" Icon={AiOutlineQuestion} />

      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gap={6}
      >
        {map(votesByNominated, (nominated, i) => (
          <Card bg="transparent" key={i}>
            <Box position="relative">
              <Image
                borderTopRadius="md"
                src={nominated?.[0]?.image || "/image-seo.jpg"}
                alt="Nominado"
                objectFit="cover"
                width="100%"
                height="140px"
              />
              <Box
                position="absolute"
                bottom="0"
                width="100%"
                bgColor="rgba(0,0,0,0.55)"
                fontFamily="Montserrat"
                minH="40px"
                padding="10px"
              >
                <Text fontSize="xs">{nominated?.[0]?.name}</Text>
              </Box>
            </Box>
            <Box>
              <Accordion allowMultiple color="white" bg="secondary.600">
                <AccordionItem>
                  <AccordionButton bg="primary.500">
                    <Text as="span" flex="1" textAlign="left" fontSize="xs">
                      Ver cómo me definieron
                    </Text>

                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <List>
                      {map(nominated, (v, i) =>
                        v?.defineWithWord ? (
                          <ListItem
                            borderBottom="0.5px solid white"
                            paddingY="10px"
                            fontSize="xs"
                            key={i}
                          >
                            <ListIcon
                              as={HiOutlineChevronRight}
                              color="primary.500"
                            />
                            <Text as="span" fontWeight="bold" color="yellow">
                              {session?.access_token
                                ? `${v?.user?.trim()}: `
                                : null}
                            </Text>
                            {v?.defineWithWord}
                          </ListItem>
                        ) : null
                      )}
                    </List>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </Card>
        ))}
      </Grid>
    </Box>
  )
}

export default Answer
