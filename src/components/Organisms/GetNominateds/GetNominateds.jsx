import { useEffect, useState, Fragment } from "react"
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
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  // Content
  content: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "column",

    "& > h4": {
      color: palette.secondary.main,
      fontSize: 24,
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
      gridTemplateColumns: "49% 49%",
    },
  },
}))

const GetNominateds = ({
  title = "Nominados",
  isNewVote,
  votes,
  handleAddVote,
  isWinners,
}) => {
  const classes = styles()
  const [nominateds, setNominateds] = useState([])
  const [categories, setCategories] = useState([])
  const [resultsBool, setResultsBool] = useState(false)

  const getNominateds = async () => {
    const dataN = await getCollectionsFirebase("nominateds")
    const dataC = await getCollectionsFirebase("categories")
    const dataWinners = filter(dataN, (n) => n.winner === true)

    setNominateds(isWinners ? dataWinners : dataN)
    setCategories(dataC)
    if (dataWinners.length > 0) setResultsBool(true)
  }

  useEffect(() => {
    console.log("test re render useEffect")
    getNominateds()
  }, [isWinners])

  console.log("test re render")

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="sm">
        <div className={classes.content}>
          {categories.length > 0 ? (
            <>
              {map(categories, (category) => (
                <Fragment key={category.id}>
                  <Text component="h4">Nominados a {category.name}</Text>
                  <div key={category.id} className={classes.category}>
                    {filter(
                      nominateds,
                      (nominated) => nominated.category === category.nameId
                    ).length > 0 ? (
                      filter(
                        nominateds,
                        (nominated) => nominated.category === category.nameId
                      ).map((nominated) => (
                        <NominatedList
                          nominated={nominated}
                          key={nominated.id}
                          isNewVote={isNewVote}
                          votes={votes}
                          handleAddVote={handleAddVote}
                          isWinners={isWinners}
                          resultsBool={resultsBool}
                        />
                      ))
                    ) : (
                      <Text>
                        No hay{" "}
                        {title === "Ganadores" ? "ganadores" : "nominados"} aún.
                      </Text>
                    )}
                  </div>
                </Fragment>
              ))}
            </>
          ) : (
            <Text>
              No hay {title === "Ganadores" ? "ganadores" : "nominados"} aún.
            </Text>
          )}
        </div>
      </Container>
    </div>
  )
}

export default GetNominateds
