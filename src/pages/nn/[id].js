import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { isEmpty } from "lodash"
import { useFormik } from "formik"
import shortid from "short-uuid"

import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { es } from "date-fns/locale"

// Validations
import useValidations from "src/hooks/useValidations"
import useValidationsInput from "src/hooks/useValidationsInput"

// Layout
import { Container, Divider, Text, Button, Card } from "@chakra-ui/react"
import { Image, Input } from "src/components/Atoms"

// // Firebase
// import {
//   updateProductFirebase,
//   getProductFirebase,
//   deleteProductFirebase,
// } from "src/lib/db"
// import { useAuth } from "src/lib/auth"

// Styles
// const styles = makeStyles(({ palette, breakpoints, fonts }) => ({
//   root: {
//     width: "100%",
//     minHeight: "calc(100vh - 72px)",
//     backgroundColor: palette.primary.main,

//     [breakpoints.down("xs")]: {
//       minHeight: "calc(100vh - 110px)",
//     },
//   },
//   container: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",

//     "& p, h6, h1": {
//       color: palette.secondary.main,
//     },
//   },
//   // Content Header
//   contentHeader: {
//     width: "100%",
//     "& > h1": {
//       fontSize: 24,
//       margin: "15px 0",
//       fontWeight: "bold",
//       marginTop: 40,
//       textAlign: "center",
//     },
//   },
//   // Content
//   content: {
//     width: "100%",
//     marginTop: 20,
//     marginBottom: 40,
//     display: "grid",
//     gridTemplateColumns: "60% auto",
//     gridGap: "20px",
//     gap: "20px",

//     [breakpoints.down("sm")]: {
//       gridTemplateColumns: "100%",
//     },
//   },
//   contentImage: {
//     marginBottom: 10,
//   },
//   divider: {
//     marginTop: 20,
//     marginBottom: 20,
//     backgroundColor: palette.secondary.main,
//   },
//   sidebar: {
//     "& button": {
//       width: "100%",
//     },

//     "& > p": {
//       marginTop: 20,
//       marginBottom: 20,
//       textAlign: "center",
//     },
//   },
//   button: {
//     width: "100%",
//   },
//   comments: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "column-reverse",
//   },
//   comment: {
//     backgroundColor: palette.primary.lighter,
//     marginTop: 10,
//   },
// }))

const Product = () => {
  const classes = styles()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [getDB, setGetDB] = useState(true)

  const {
    query: { id },
    push,
  } = useRouter()
  const { user } = useAuth()

  // Get product
  useEffect(async () => {
    if (id && getDB) {
      const product = await getProductFirebase(id)
      setGetDB(false)
      if (!product.exists) {
        push("/")
      } else {
        setData({ id: product.id, ...product.data() })
      }
    }
  }, [id, getDB])

  // Product
  const {
    id: idProduct,
    comments,
    created,
    description,
    company,
    name,
    image,
    votes,
    votesUser,
    url,
    user: userProduct,
  } = data

  /* Create comment */
  // Validations
  const { newCommentSchema } = useValidations()
  const { funcIsError, funcIsTextError } = useValidationsInput()

  const { handleSubmit, errors, values, handleChange, touched, resetForm } =
    useFormik({
      initialValues: { comment: "" },
      onSubmit: async ({ comment }) => {
        setLoading(true)
        if (!user) {
          push("/iniciar-sesion")
        }

        const newComment = {
          content: comment,
          user: {
            id: user.uid,
            name: user.name,
          },
        }

        // Save DB
        const newComments = [...comments, newComment]

        await updateProductFirebase(idProduct, { comments: newComments })
        setGetDB(true)

        resetForm()
        setLoading(false)
      },
      validationSchema: newCommentSchema,
    })

  // Votes
  const handleVote = async () => {
    setLoading(true)
    if (!user) {
      push("/iniciar-sesion")
    }

    // Save DB
    if (votesUser?.includes(user?.uid)) return

    const newVotes = votes + 1
    const newVotesUser = [...votesUser, user.uid]

    await updateProductFirebase(idProduct, {
      votes: newVotes,
      votesUser: newVotesUser,
    })
    setGetDB(true)

    // Save local
    setLoading(false)
  }

  const handleDelete = async () => {
    if (user.uid !== userProduct.id) return

    await deleteProductFirebase(idProduct)
    push("/")
  }

  // Loading
  if (isEmpty(data)) return <Text>Cargando...</Text>

  return (
    <div>
      <Container>
        <div>
          <Text>{name}</Text>
        </div>

        <Text>
          Publicado hace{" "}
          {formatDistanceToNow(new Date(created), {
            locale: es,
          })}
        </Text>
        <div>
          <div>
            <Image src={image} alt="Product" width="100%" wrapper />

            <Text>{description}</Text>
          </div>
          <div>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button>Ver URL</Button>
            </a>

            <Text>Votos: {votes}</Text>
            {user && user.uid !== userProduct.id && (
              <>
                {votesUser?.includes(user?.uid) ? (
                  <Button>Ya votaste</Button>
                ) : (
                  <Button onClick={loading ? () => {} : handleVote}>
                    Votar
                  </Button>
                )}
              </>
            )}

            <Text>Empresa {company}</Text>
            <Text>Por {userProduct.name}</Text>
            {user.uid === userProduct.id && (
              <Button onClick={handleDelete}>Eliminar producto</Button>
            )}
          </div>
          <div>
            <div>
              <Text>Comentarios</Text>
            </div>
            {user && (
              <form onSubmit={handleSubmit}>
                <Input
                  name="comment"
                  label="Comentario"
                  value={values.comment}
                  onChange={handleChange}
                  error={funcIsError(errors.comment, touched.comment)}
                  helperText={funcIsTextError(errors.comment, touched.comment)}
                  multiline
                />
                {loading ? (
                  <Button>Cargando...</Button>
                ) : (
                  <Button type="submit">Comentar</Button>
                )}
              </form>
            )}

            <Divider />

            {comments.length ? (
              <div>
                {comments.map((c) => (
                  <Card key={shortid.generate()}>
                    <Text>{c?.content}</Text>
                    <Text>Escrito por: {c?.user?.name} </Text>
                    {c?.user?.id === userProduct?.id && (
                      <Paper>
                        <Text>Es el creador del producto</Text>
                      </Paper>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <Text>Aún no hay comentarios.</Text>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Product
