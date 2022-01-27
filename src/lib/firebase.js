import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

import "firebase/functions"

import { config } from "./config"

// if (firebase?.apps.length < 1) {
const firebaseApp = initializeApp(config)

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp)

export const db = getFirestore(firebaseApp)

export const auth = getAuth(firebaseApp)
