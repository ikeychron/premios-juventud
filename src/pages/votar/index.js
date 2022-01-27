import { useCallback, useState } from "react"
import { useFormik } from "formik"
import { useDropzone } from "react-dropzone"
import Router from "next/router"

// Validations
import useValidations from "src/hooks/useValidations"
import useValidationsInput from "src/hooks/useValidationsInput"

// Layout
import { Container, CardActionArea } from "@material-ui/core"
import { Text, Button, Input, Image } from "src/components/Atoms"

// Firebase
import { createProduct, storageRef, newFileName } from "src/lib/db"
import { useAuth } from "src/lib/auth"

// Styles
import { makeStyles } from "@material-ui/core/styles"
const styles = makeStyles(({ palette, breakpoints, fonts }) => ({
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

const NewProduct = () => {
  const classes = styles()
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  // Validations
  const { newProductSchema } = useValidations()
  const { funcIsError, funcIsTextError } = useValidationsInput()

  // File
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setValues({ ...values, image: file })
      const reader = new FileReader()

      reader.onload = () => {
        const binaryStr = reader.result
        setImage(binaryStr)
      }
      reader.readAsDataURL(file)
    })
  })

  const maxSize = 300 * 1000 // 300 kb
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize,
    accept: "image/*",
  })
  const { ref, ...rootProps } = getRootProps()

  const { user } = useAuth()
  const funcCreateProduct = async ({ image, ...values }) => {
    setLoading(true)
    const data = {
      ...values,
      votes: 0,
      votesUser: [],
      comments: [],
      created: Date.now(),
      image: "",
      user: {
        id: user.uid,
        name: user.name,
        email: user.email,
      },
    }

    try {
      if (image) {
        // Upload file and metadata to the object 'images/mountains.jpg'
        const uploadTask = storageRef
          .child(`products/${newFileName(image.type)}`)
          .put(image, { contentType: image.type })

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log("Upload is " + progress + "% done")
          },
          function (error) {
            console.error("Upload file ->", error)
          },
          function () {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(async (downloadURL) => {
                setLoading(false)
                data.image = downloadURL
                await createProduct(data)
                Router.push("/")
              })
          }
        )
      }
    } catch (error) {
      setLoading(false)
      console.error("Upload file ->", error)
    }
  }

  // Form
  const {
    handleSubmit,
    errors,
    values,
    handleChange,
    touched,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
      company: "",
      url: "",
      description: "",
      image: "",
    },
    onSubmit: funcCreateProduct,
    validationSchema: newProductSchema,
  })

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="sm">
        <Text component="h1">Nuevo producto</Text>

        <form className={classes.content} onSubmit={handleSubmit}>
          <Input
            name="name"
            label="Nombre del producto"
            value={values.name}
            onChange={handleChange}
            error={funcIsError(errors.name, touched.name)}
            helperText={funcIsTextError(errors.name, touched.name)}
            color="secondary"
          />
          <Input
            name="company"
            label="Empresa"
            value={values.company}
            onChange={handleChange}
            error={funcIsError(errors.company, touched.company)}
            helperText={funcIsTextError(errors.company, touched.company)}
            color="secondary"
          />

          <Input
            name="url"
            label="URL"
            value={values.url}
            onChange={handleChange}
            error={funcIsError(errors.url, touched.url)}
            helperText={funcIsTextError(errors.url, touched.url)}
            color="secondary"
          />
          <Input
            name="description"
            label="Descripción"
            value={values.description}
            onChange={handleChange}
            error={funcIsError(errors.description, touched.description)}
            helperText={funcIsTextError(
              errors.description,
              touched.description
            )}
            color="secondary"
            multiline
          />

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
                {funcIsError(errors.image, touched.image) ? (
                  <Text className={classes.textError}>
                    {funcIsTextError(errors.image, touched.image)}
                  </Text>
                ) : (
                  <Text>Tamaño máximo de la imagen: 300kb</Text>
                )}
              </>
            )}
          </div>

          {loading ? (
            <Text>Cargando...</Text>
          ) : (
            <Button color="secondary" variant="contained" type="submit">
              Agregar producto
            </Button>
          )}
        </form>
      </Container>
    </div>
  )
}

export default NewProduct
