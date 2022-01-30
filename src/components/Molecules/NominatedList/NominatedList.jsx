import { find } from "lodash"
import clsx from "clsx"

// Layout
import { Card, CardActionArea, CardContent } from "@material-ui/core"
import { Text, Image } from "src/components/Atoms"

// Styles
import styles from "./styles"

export default function NominadList({
  nominated,
  isNewVote,
  votes,
  handleAddVote,
  resultsBool,
}) {
  const classes = styles()

  const { name, image, votes: votesNominated } = nominated

  const selected = find(votes, (v) => v.id === nominated.id)
  const selectedOther =
    find(votes, (v) => v.category === nominated.category) && !selected

  return (
    <Card
      className={clsx({
        [classes.root]: true,
        [classes.rootSelected]: selected,
        [classes.rootNotSelected]: selectedOther,
      })}
    >
      <CardActionArea
        className={classes.nominated}
        onClick={isNewVote ? () => handleAddVote(nominated) : () => {}}
      >
        <Image src={image || "/image-seo.png"} alt="Nominado" height="100%" />
        <CardContent className={classes.content}>
          <Text
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {name}
          </Text>

          {resultsBool && (
            <Text className={classes.votes}>Votos: {votesNominated || 0}</Text>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
