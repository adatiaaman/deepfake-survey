import React, {useContext,useState,useEffect} from 'react'
import {auth, db} from '../config/firebaseConfig.jsx'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    async function signup(email, username, age, gender) {
        
        const usersRef = await db.collection('Surveys');
        let checker = 0;
    
        const q = usersRef.where('About.email', '==', email).get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              // User with email found, you can access their data
              console.log('444');
              querySnapshot.forEach(async (doc) => {
                console.log('555');
                const videoIndex = await doc.data().details.current_video_index;
                console.log('vi', videoIndex)
                if (videoIndex === 19) {
                    checker = -1;
                }
                else{
                    localStorage.setItem('currentVideoIndex', (videoIndex + 1).toString());
                }
                // console.log(videoIndex)
              });
            } else {
              console.log('User with email not found.');
            }
          })
        console.log('222');
        await auth.createUserWithEmailAndPassword(email, "123456").then(
            (user)=>{
                db.collection("Surveys").doc(user.user.uid).set({
                    "About": {         
                        email: email,
                        name: username,
                        age: age,
                        gender: gender
                    }
                }, { merge: true })
            }              
        ).catch(() => {
            console.log('User presnt');
        })
        console.log('333');
        return checker;
    
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}