import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAwTtX4dhvt8f99p50Ep3p14cvbyBVsCWA',
  authDomain: 'movie-app-accounts.firebaseapp.com',
  projectId: 'movie-app-accounts',
  storageBucket: 'movie-app-accounts.appspot.com',
  messagingSenderId: '4822141031',
  appId: '1:4822141031:web:f8f74eb12d14ac25876cc2',
  measurementId: 'G-GKYVJWXGNS',
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({ prompt: 'select_account' })

//export const signInWithGoogle = () => auth.signInWithPopup(provider)
export default firebase
