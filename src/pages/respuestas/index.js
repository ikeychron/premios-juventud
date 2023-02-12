import { map } from "lodash"
import { useSession } from "@supabase/auth-helpers-react"
import {
  Heading,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  Text,
} from "@chakra-ui/react"
import { HiOutlineChevronRight } from "react-icons/hi"
import { MdOutlineQuestionAnswer } from "react-icons/md"
import Title from "src/components/Molecules/Title"
import useVotes from "src/hooks/useVotes"
import { questions } from "src/data/constants"

const Answer = () => {
  const {
    values: { questionsFiltereds },
  } = useVotes()

  // Auth
  const session = useSession()

  return (
    <Box>
      <Title title="Sus Respuestas" Icon={MdOutlineQuestionAnswer} />

      <Accordion allowMultiple color="white" bg="secondary.600">
        {map(Object.keys(questions), (key) => (
          <AccordionItem key={key}>
            <AccordionButton bg="primary.500">
              <Text as="span" flex="1" textAlign="left">
                {questions[key]}
              </Text>

              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <List>
                {map(questionsFiltereds, (question, index) => (
                  <ListItem
                    borderBottom="0.5px solid white"
                    paddingY="10px"
                    key={index}
                  >
                    <ListIcon as={HiOutlineChevronRight} color="primary.500" />
                    <Text as="span" fontWeight="bold" color="yellow">
                      {session?.access_token
                        ? `${question?.user?.trim()}: `
                        : null}
                    </Text>
                    {question?.questions[key]}
                  </ListItem>
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  )
}

export default Answer
