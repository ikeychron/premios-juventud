import firebase from "firebase/app"
import "firebase/auth"
import "firebase/functions"
import "firebase/firestore"
import "firebase/storage"

import { config } from "./config"

if (firebase?.apps.length < 1) {
  firebase.initializeApp(config)
}

export default firebase
