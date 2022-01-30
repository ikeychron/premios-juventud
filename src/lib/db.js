import shortid from "short-uuid"
import {
  doc,
  getDocs,
  getDoc,
  collection,
  addDoc,
  updateDoc as updateDocDB,
  deleteDoc as deleteDocDB,
} from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

import { db, auth, storage } from "./firebase"

const response = (message, success) => ({ message, success })

const newFileName = (type) => `${shortid.generate()}.${type.split("/")[1]}`

export async function updateDoc(data, collectionName, docId) {
  try {
    return await updateDocDB(doc(db, collectionName, docId), data)
  } catch (error) {
    console.error("Update doc ->", error)
  }
}

export async function deleteDoc(collectionName, docId) {
  const user = await auth.currentUser

  try {
    if (!user) {
      return response("No hay usuario autenticado", false)
    }

    return await deleteDocDB(doc(db, collectionName, docId))
  } catch (error) {
    console.error("Delete doc ->", error)
  }
}

export async function createDoc(data, collectionName) {
  try {
    return await addDoc(collection(db, collectionName), data)
  } catch (error) {
    console.error("Create doc ->", error)
  }
}

export async function uploadFile(image, name, cb) {
  if (!image) return
  try {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const uploadTask = uploadBytesResumable(
      ref(storage, `${name}/${newFileName(image.type)}`),
      image,
      { contentType: image.type }
    )

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // eslint-disable-next-line no-console
        console.log("Upload is " + progress + "% done")
      },
      function (error) {
        console.error("Upload file ->", error)
      },
      function () {
        // Upload completed successfully, now we can get the download URL
        if (cb) getDownloadURL(uploadTask.snapshot.ref).then(cb)
      }
    )
  } catch (error) {
    console.error("Upload file ->", error)
  }
}

export const getCollectionsFirebase = async (collectionProp) => {
  const docs = await getDocs(collection(db, collectionProp))
  const data = []
  await docs.forEach((doc) =>
    data.push({
      id: doc.id,
      ...doc.data(),
    })
  )

  return data
}
export const getNominatedFirebase = async (id) => {
  const nominated = await getDoc(doc(db, "nominateds", id)).get()
  return nominated
}
