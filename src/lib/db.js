import shortid from "short-uuid"
import firebase from "./firebase"

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storageRef = firebase.storage().ref()

const response = (message, success) => ({ message, success })

export async function createUser(uid, data) {
  return await db
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}

export const newFileName = (type) =>
  `${shortid.generate()}.${type.split("/")[1]}`

export async function uploadFile(where = "images", file = null) {
  const user = await auth.currentUser

  try {
    if (!user) {
      return response("No hay usuario autenticado", false)
    }

    if (file) {
      // Upload file and metadata to the object 'images/mountains.jpg'
      const uploadTask = storageRef
        .child(`${where}/${newFileName(file.type)}`)
        .put(file, { contentType: file.type })

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
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            return downloadURL
          })
        }
      )
    }
  } catch (error) {
    console.error("Upload file ->", error)
  }
}

export async function createProduct(data) {
  const user = await auth.currentUser

  try {
    if (!user) {
      return response("No hay usuario autenticado", false)
    }

    return await db.collection("products").add(data)
  } catch (error) {
    console.error("Create product ->", error)
  }
}

export const getProductsFirebase = (cb, order = "created") =>
  db.collection("products").orderBy(order, "desc").onSnapshot(cb)

export const getProductFirebase = async (id) => {
  const product = await db.collection("products").doc(id).get()
  return product
}

export const updateProductFirebase = async (id, data) => {
  return await db.collection("products").doc(id).update(data)
}

export const deleteProductFirebase = async (id) => {
  return await db.collection("products").doc(id).delete()
}
