import { Text, Heading, ButtonGroup, Button, Box, Grid } from "@chakra-ui/react"
import useVotes from "src/hooks/useVotes"

const HowDoYouDefineMe = () => {
  const { values } = useVotes()
  // const { votes } = values

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        mb="30px"
        justifyContent={["center", "center", "flex-start"]}
      >
        <Heading as="h1" size={"md"} color="white" mr="8px" mb="5px">
          ¿Cómo me definen?
        </Heading>
      </Box>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={6}
        minH="550px"
      ></Grid>
    </Box>
  )
}

export default HowDoYouDefineMe
