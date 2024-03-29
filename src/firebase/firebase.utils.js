import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyB95DvvyObrMh_dmiprQejKWemHu6JD8Ls",
    authDomain: "crwn-clothing-ae5e0.firebaseapp.com",
    databaseURL: "https://crwn-clothing-ae5e0.firebaseio.com",
    projectId: "crwn-clothing-ae5e0",
    storageBucket: "",
    messagingSenderId: "685556739002",
    appId: "1:685556739002:web:44e8406b7e5e359462cb83"
}

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if(!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase