import { find } from "lodash"

// Layout
import { Card, CardBody, Text, Box, Image } from "@chakra-ui/react"

export default function NominadList({
  nominated,
  isNewVote,
  votes,
  handleAddVote,
  resultsBool,
  key,
}) {
  const { name, image, votes: votesNominated } = nominated

  const selected = find(votes, (v) => v.id === nominated.id)
  const selectedOther =
    find(votes, (v) => v.category === nominated.category) && !selected

  return (
    <Card
      onClick={isNewVote ? () => handleAddVote(nominated) : () => {}}
      width="200px"
      height="300px"
      position="relative"
      key={key}
    >
      <Image
        borderRadius="md"
        src={image || "/image-seo.jpg"}
        alt="Nominado"
        objectFit="cover"
        height="100%"
      />
      <CardBody
        position="absolute"
        bottom="0"
        width="100%"
        bgColor="rgba(0,0,0,0.55)"
        fontFamily="Montserrat"
      >
        <Text>{name}</Text>

        {resultsBool && <Text>Votos: {votesNominated || 0}</Text>}
      </CardBody>
    </Card>
  )
}
