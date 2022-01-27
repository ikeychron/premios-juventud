// Layout
import { Card, CardActionArea, CardContent } from "@material-ui/core"
import { Text, Image } from "src/components/Atoms"

// Styles
import styles from "./styles"

export default function NominadList({ nominated }) {
  const classes = styles()

  const { nominacion, name, image, votes } = nominated

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.product}>
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

          <Text
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.subtitle}
          >
            {nominacion}
          </Text>

          <Text
            gutterBottom
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.company}
          >
            {nominacion}
          </Text>
          {/*   <Text
            gutterBottom
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.company}
          >
            Publicado hace{" "}
            {formatDistanceToNow(new Date(created), {
              locale: es,
            })}
          </Text> */}

          <Text className={classes.price}>Votos: {votes}</Text>
          {/* <Text className={classes.price}>Comentarios: {comments.length}</Text> */}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
