import { getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

import "firebase/functions"

import { config } from "./config"

if (getApps().length < 1) initializeApp(config)

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage()

export const db = getFirestore()

export const auth = getAuth()
