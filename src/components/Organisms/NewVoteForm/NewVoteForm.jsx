import { useState, useEffect } from "react"
import { find, filter } from "lodash"
import { useRouter } from "next/router"
import { makeStyles } from "@material-ui/core/styles"

// Layout
import { Container } from "@material-ui/core"
import { Text, Button, Input } from "src/components/Atoms"

// Firebase
import { getCollectionsFirebase, createDoc } from "src/lib/db"
import GetNominateds from "../GetNominateds/GetNominateds"

// Styles
const styles = makeStyles(({ palette }) => ({
  root: {
    width: "100%",
    backgroundColor: palette.primary.main,
  },
  container: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& > h1": {
      alignSelf: "flex-start",
      color: palette.secondary.main,
      fontSize: 24,
      textDecoration: "underline",
      margin: "15px 0",
      fontWeight: "bold",
      alignItems: "center",
    },
  },
  // Content
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,

    "& p": {
      color: palette.secondary.main,
    },

    "& > button": {
      marginTop: 20,
      padding: 10,
    },
  },
  error: {
    width: "100%",
    display: "flex",
    padding: 10,
    backgroundColor: palette.error.main,
    justifyContent: "center",
  },
}))

const formatVote = ({ category, id, name, votes }) => {
  return {
    category,
    id,
    name,
    votes,
  }
}

const NewVoteForm = () => {
  const classes = styles()
  const [name, setName] = useState("")
  const [votes, setVotes] = useState([])
  const [categories, setCategories] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { push } = useRouter()

  const getCategories = async () => {
    const dataC = await getCollectionsFirebase("categories")
    setCategories(dataC)
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleRemoveVote = (nominated) => {
    const newVotes = filter(votes, (v) => v.id !== nominated.id)
    setVotes(newVotes)
  }

  const handleAddVote = (nominated) => {
    setError("")
    // Validate a nominated by category
    const nominateExist = find(votes, (v) => nominated.category === v.category)
    if (!nominateExist) {
      setVotes((prev) => [...prev, formatVote(nominated)])
    } else {
      handleRemoveVote(nominateExist)
      setVotes((prev) => [...prev, formatVote(nominated)])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (votes.length === categories.length) {
      const data = {
        name,
        votes,
        created: Date.now(),
      }

      try {
        await createDoc(data, "votes")
        push("/votar")
        setLoading(false)
      } catch (error) {
        console.error("New Vote ->", error)
        setLoading(false)
      }
    } else {
      setError("Te hacen falta votos en alguna categoría")
    }
    setLoading(false)
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="sm">
        <Text component="h1">Nuevo voto</Text>

        <form className={classes.content} onSubmit={handleSubmit}>
          <Input
            name="name"
            label="Nombres y apellidos"
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{
              required: true,
            }}
            color="secondary"
          />

          <GetNominateds
            isNewVote
            votes={votes}
            setVotes={setVotes}
            handleAddVote={handleAddVote}
          />

          {error && (
            <div className={classes.error}>
              <Text>{error}</Text>
            </div>
          )}

          {loading ? (
            <Text>Cargando...</Text>
          ) : (
            <Button color="secondary" variant="contained" type="submit">
              Votar
            </Button>
          )}
        </form>
      </Container>
    </div>
  )
}

export default NewVoteForm
