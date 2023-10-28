import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBh25fo0iDVcFoG5_rDXJWoVFme4II54wY",
    authDomain: "blixify-event-volunteering.firebaseapp.com",
    projectId: "blixify-event-volunteering",
    storageBucket: "blixify-event-volunteering.appspot.com",
    messagingSenderId: "999785232184",
    appId: "1:999785232184:web:2aeb4ba1cafe2d694ff3cd"
  };

const app = initializeApp(firebaseConfig)

const db = getFirestore()

const auth = getAuth()

const storage = getStorage(app)

export { db, auth, storage }