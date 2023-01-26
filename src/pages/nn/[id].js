import { useState } from "react"
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
import { Box, Divider, Text, Button, Card, Image } from "@chakra-ui/react"
import { Input } from "src/components/Atoms"

const Product = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [getDB, setGetDB] = useState(true)

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
    <Box>
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
                <Button onClick={loading ? () => {} : handleVote}>Votar</Button>
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
                    <Card>
                      <Text>Es el creador del producto</Text>
                    </Card>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Text>Aún no hay comentarios.</Text>
          )}
        </div>
      </div>
    </Box>
  )
}

export default Product
