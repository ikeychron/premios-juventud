/* eslint-disable no-unused-vars */
import { useCallback, useState } from "react"
import { useFormik } from "formik"
import { useDropzone } from "react-dropzone"
import Router from "next/router"
import imageCompression from "browser-image-compression"

// Validations
import useValidations from "src/hooks/useValidations"
import useValidationsInput from "src/hooks/useValidationsInput"

// Layout
import { Container, CardActionArea, MenuItem } from "@material-ui/core"
import { Text, Button, Input, Image } from "src/components/Atoms"

// Firebase
import { createNominated, uploadFile } from "src/lib/db"

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
  paperFile: {
    marginTop: 20,
    backgroundColor: palette.primary.lighter,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentImage: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  textError: {
    color: `${palette.error.main} !important`,
  },
}))

const NominatedForm = () => {
  const classes = styles()
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  // Validations
  const { funcIsError, funcIsTextError } = useValidationsInput()
  const { newNominatedSchema } = useValidations()

  // File
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const newImage = await imageCompression(file, { maxSizeMB: 1 })
      const reader = new FileReader()

      setValues({ ...values, image: newImage })

      reader.onload = () => {
        const binaryStr = reader.result
        setImage(binaryStr)
      }
      reader.readAsDataURL(newImage)
    })
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: "image/*",
  })
  const { ref, ...rootProps } = getRootProps()

  const funcCreateNominated = async ({ image, ...values }) => {
    setLoading(true)
    const data = {
      ...values,
      votes: 0,
      votesUser: [],
      winner: false,
      created: Date.now(),
      image: "",
    }

    try {
      if (image) {
        const url = await uploadFile(image, "nominateds", async (url) => {
          data.image = url
          const nominat = await createNominated(data)
          setLoading(false)
          Router.push("/")
        })
      }
    } catch (error) {
      console.error("Upload file ->", error)
      setLoading(false)
    }
  }

  // Form
  const { handleSubmit, errors, values, handleChange, touched, setValues } =
    useFormik({
      initialValues: {
        name: "",
        category: "",
        image: "",
      },
      onSubmit: funcCreateNominated,
      validationSchema: newNominatedSchema,
    })

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="sm">
        <Text component="h1">Crear nominado</Text>

        <form className={classes.content} onSubmit={handleSubmit}>
          <Input
            name="name"
            label="Nombres y apellidos"
            value={values.name}
            onChange={handleChange}
            error={funcIsError(errors.name, touched.name)}
            helperText={funcIsTextError(errors.name, touched.name)}
            color="secondary"
          />
          <Input
            name="category"
            label="Categoría"
            value={values.category}
            onChange={handleChange}
            error={funcIsError(errors.category, touched.category)}
            helperText={funcIsTextError(errors.category, touched.category)}
            color="secondary"
            select
          >
            <MenuItem value="most-serious">La persona más seria</MenuItem>
            <MenuItem value="most-style">La persona con más estilo</MenuItem>
          </Input>

          <CardActionArea {...rootProps} className={classes.paperFile}>
            <input {...getInputProps()} />

            {!isDragActive ? (
              <Text>
                Arrastra una imagen aquí, o haz click para subir una imagen.
              </Text>
            ) : (
              <Text>Suelta la imagen aquí</Text>
            )}
          </CardActionArea>

          <div className={classes.contentImage}>
            {image !== null ? (
              <Image src={image} width="50%" />
            ) : (
              <>
                {funcIsError(errors.image, touched.image) && (
                  <Text className={classes.textError}>
                    {funcIsTextError(errors.image, touched.image)}
                  </Text>
                )}
              </>
            )}
          </div>

          {loading ? (
            <Text>Cargando...</Text>
          ) : (
            <Button color="secondary" variant="contained" type="submit">
              Crear nominado
            </Button>
          )}
        </form>
      </Container>
    </div>
  )
}

export default NominatedForm
