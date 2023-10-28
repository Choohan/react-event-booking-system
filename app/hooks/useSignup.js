import { useState } from 'react'

import { db, auth } from '../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = (email, password, userData) => {
        setError(null)
        let userID = null
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                setDoc(doc(db, "users", res.user.uid), userData)
                dispatch({ type: 'LOGIN', payload: res.user})
            })
            .catch((err) => {
                setError(err.message)
            })
        return userID
    }

    return { error, signup }
}