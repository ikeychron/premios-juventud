import Router from "next/router"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { es } from "date-fns/locale"

// Layout
import { Card, CardActionArea, CardContent } from "@material-ui/core"
import { Text, Image } from "src/components/Atoms"

// Styles
import styles from "./styles"

export default function ProductList({ product }) {
  const classes = styles()

  const {
    id,
    comments,
    created,
    description,
    company,
    name,
    image,
    votes,
  } = product

  return (
    <Card className={classes.root}>
      <CardActionArea
        className={classes.product}
        onClick={() => Router.push(`/productos/${id}`)}
      >
        <Image src={image} alt="Product" height="100%" />
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
            {description}
          </Text>

          <Text
            gutterBottom
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.company}
          >
            {company}
          </Text>
          <Text
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
          </Text>

          <Text className={classes.price}>Votos: {votes}</Text>
          <Text className={classes.price}>Comentarios: {comments.length}</Text>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
