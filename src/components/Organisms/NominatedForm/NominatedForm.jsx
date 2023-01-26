import { useCallback, useState } from "react"
import { useFormik } from "formik"
import { useDropzone } from "react-dropzone"
import Router from "next/router"
import imageCompression from "browser-image-compression"

// Validations
import useValidations from "src/hooks/useValidations"
import useValidationsInput from "src/hooks/useValidationsInput"

// Layout
import { Box, Button, Text, Card, Image } from "@chakra-ui/react"
import { Input } from "src/components/Atoms"
import useAppSelector from "src/hooks/useAppSelector"

// Utils
import capitalizeFirstLetter from "src/utils/capitalize"

const NominatedForm = () => {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const categories = useAppSelector((s) => s.generics.categories)

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
        await uploadFile(image, "nominateds", async (url) => {
          data.image = url
          await createDoc(data, "nominateds")
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
    <Box>
      <Text>Crear nominado</Text>

      <form onSubmit={handleSubmit}>
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
          {categories.map((c) => (
            <div value={c.nameId} key={c.nameId}>
              {capitalizeFirstLetter(c.name)}
            </div>
          ))}
        </Input>

        <Card {...rootProps}>
          <input {...getInputProps()} />

          {!isDragActive ? (
            <Text>
              Arrastra una imagen aquí, o haz click para subir una imagen.
            </Text>
          ) : (
            <Text>Suelta la imagen aquí</Text>
          )}
        </Card>

        <div>
          {image !== null ? (
            <Image src={image} width="50%" />
          ) : (
            <>
              {funcIsError(errors.image, touched.image) && (
                <div>
                  <Text>{funcIsTextError(errors.image, touched.image)}</Text>
                </div>
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
    </Box>
  )
}

export default NominatedForm
