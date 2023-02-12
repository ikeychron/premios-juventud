import { Heading, Box } from "@chakra-ui/react"

const Title = ({ Icon, title }) => (
  <Box
    display="flex"
    alignItems="center"
    mb="30px"
    justifyContent={["center", "center", "flex-start"]}
    mr="8px"
  >
    <Icon color="#fff" size="30px" />

    <Heading as="h1" size={["sm", "md"]} color="white" ml="10px">
      {title}
    </Heading>
  </Box>
)

export default Title
