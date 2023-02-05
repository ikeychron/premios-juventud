import { useMemo } from "react"
import { find } from "lodash"

// Layout
import { Card, CardBody, Text, Image, CardFooter } from "@chakra-ui/react"
import useNewVote from "src/hooks/useNewVote"

const NominatedItem = ({ nominated, resultsBool }) => {
  const { actions, values } = useNewVote()

  const { votes, isNewVote } = values
  const { handleAddVote } = actions

  const selected = useMemo(
    () => find(votes, (v) => v.id === nominated.id),
    [votes, nominated]
  )
  const selectedOther = useMemo(
    () => find(votes, (v) => v.category === nominated.category) && !selected,
    [votes, nominated, selected]
  )

  return (
    <Card
      onClick={isNewVote ? () => handleAddVote(nominated) : () => {}}
      width={["265px", "180px"]}
      height={["300px", "260px"]}
      m="0 auto"
      position="relative"
      cursor={isNewVote ? "pointer" : "inherit"}
      transition={isNewVote ? "transform .3s ease" : "none"}
      _hover={
        isNewVote
          ? {
              boxShadow: "0 2px 3px rgba(0, 0, 0, 0.7)",
              transform: "translateY(-6px)",
            }
          : undefined
      }
    >
      <Image
        borderRadius="md"
        src={nominated?.image || "/image-seo.jpg"}
        alt="Nominado"
        objectFit="cover"
        width="100%"
        height="100%"
        filter={selectedOther ? "grayscale(1)" : "none"}
        boxShadow={selected ? "0 2px 3px rgba(0, 0, 0, 0.7)" : "none"}
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
