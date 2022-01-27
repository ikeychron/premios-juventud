import { useEffect, useState } from "react"
import { map, filter } from "lodash"

// Layout
import { Container } from "@material-ui/core"
import { Text } from "src/components/Atoms"
import NominatedList from "src/components/Molecules/NominatedList"

// Firebase
import { getCollectionsFirebase } from "src/lib/db"

// Styles
import { makeStyles } from "@material-ui/core/styles"
const styles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    width: "100%",
    minHeight: "calc(100vh - 72px)",
    backgroundColor: palette.primary.main,

    [breakpoints.down("xs")]: {
      minHeight: "calc(100vh - 110px)",
    },
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  // Content Header
  contentHeader: {
    "& > h1": {
      color: palette.secondary.main,
      fontSize: 40,
      margin: "15px 0",
      fontWeight: "bold",
      textDecoration: "underline",
    },

    "& button": {
      marginBottom: 40,
    },
  },
  // Content
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",

    "& > h4": {
      color: palette.secondary.main,
      fontSize: 22,
      margin: "15px 0",
      fontWeight: "bold",
    },

    "& > p": {
      color: palette.secondary.main,
    },
  },
  category: {
    width: "100%",
    display: "grid",
    gridGap: "10px",
    gap: "10px",
    gridTemplateColumns: "33% 33% 33%",
    justifyContent: "space-between",

    [breakpoints.down("xs")]: {
      gridTemplateColumns: "100%",
    },
  },
}))

const GetNominateds = ({ title = "Nominados" }) => {
  const classes = styles()
  const [nominateds, setNominateds] = useState([])
  const [categories, setCategories] = useState([])

  const getNominateds = async () => {
    await getCollectionsFirebase("nominateds", setNominateds)
    await getCollectionsFirebase("categories", setCategories)
  }

  useEffect(() => {
    getNominateds()
  }, [])

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.contentHeader}>
          <Text component="h1">{title}</Text>
        </div>
        {title === "Nominados" ? (
          <div className={classes.content}>
            {categories.length > 0 ? (
              <>
                {map(categories, (category) => (
                  <>
                    <Text component="h4">Nominados a {category.name}</Text>
                    <div key={category.id} className={classes.category}>
                      {filter(
                        nominateds,
                        (nominated) => nominated.category === category.nameId
                      ).map((nominated) => (
                        <NominatedList
                          nominated={nominated}
                          key={nominated.id}
                        />
                      ))}
                    </div>
                  </>
                ))}
              </>
            ) : (
              <Text>No hay nominados aún.</Text>
            )}
          </div>
        ) : (
          <div className={classes.content}>
            <Text>No hay ganadores aún.</Text>
          </div>
        )}
      </Container>
    </div>
  )
}

export default GetNominateds
