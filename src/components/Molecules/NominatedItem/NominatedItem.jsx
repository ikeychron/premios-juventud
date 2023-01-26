import { useMemo } from "react"
import { find } from "lodash"

// Layout
import { Card, CardBody, Text, Image } from "@chakra-ui/react"

const NominatedItem = ({
  nominated,
  isNewVote,
  votes,
  handleAddVote,
  resultsBool,
  key,
}) => {
  const selected = find(votes, (v) => v.id === nominated.id)
  const selectedOther =
    find(votes, (v) => v.category === nominated.category) && !selected

  const validateFilterImage = () => {
    if (selected) return "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.7))"
    if (selectedOther) return "grayscale(1)"

    return "none"
  }

  return (
    <Card
      onClick={isNewVote ? () => handleAddVote(nominated) : () => {}}
      width="180px"
      height="260px"
      position="relative"
      cursor={isNewVote ? "pointer" : "inherit"}
      key={key}
    >
      <Image
        borderRadius="md"
        src={nominated?.image || "/image-seo.jpg"}
        alt="Nominado"
        objectFit="cover"
        height="100%"
        filter={validateFilterImage()}
      />
      <CardBody
        h={resultsBool ? "88px" : "80px"}
        position="absolute"
        bottom="0"
        width="100%"
        bgColor="rgba(0,0,0,0.55)"
        fontFamily="Montserrat"
      >
        <Text fontSize="sm">{nominated?.name}</Text>
        {resultsBool && (
          <Text fontSize="xs">Votos: {nominated?.votes || 0}</Text>
        )}
      </CardBody>
    </Card>
  )
}

export default NominatedItem
