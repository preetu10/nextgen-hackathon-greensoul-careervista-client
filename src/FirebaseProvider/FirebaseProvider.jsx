/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword ,signInWithPopup,signOut,updateProfile} from "firebase/auth";
import auth from "../firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

//import { useLocation, useNavigate } from "react-router-dom";
export const AuthContext = createContext(null);

//social providers
const googleProvider = new GoogleAuthProvider();

const githubProvider = new GithubAuthProvider();
const FirebaseProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    console.log(loading)
    console.log(user)
    //create user
    const createUser = (email, password) =>
    {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
        
    }
   const updateUserProfile = (name,image) =>
   {
    return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
      });
   }
  
        //signin user
        const signinUser = (email,password) =>

        {
           setLoading(true)
           return signInWithEmailAndPassword(auth, email, password)
        }
         //navigation system
  
        //google login
        const signinWithGoogle = () =>
        {
            setLoading(true)
            signInWithPopup(auth, googleProvider)
            .then(
                result =>
                {
                    if(result.user)
                    {
                        console.log(user)
                    }
                }
            )
        }
        //github login
        const signinWithGithub = () =>
            {
                setLoading(true)
                signInWithPopup(auth, githubProvider)
                .then(
                    result =>
                    {
                        if(result.user)
                        {
                            console.log(user)
                        }
                    }
                )
            }
              // save user
  const saveUser = async user => {
    const currentUser = {
      email: user?.email,
      role: 'user',
      status: 'Verified',
    }
    const { data } = await axios.put(
      `http://localhost:5000/api/user`,
      currentUser
    )
    return data
  }
  const logOut = () =>
    {
        setUser(null)
        
        signOut(auth)
    }
      
    useEffect(
        () =>
        {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                 setUser(user)
                 saveUser(user)
                 setLoading(false)
                } else {
                  // User is signed out
                  // ...
                  setLoading(false)
                }
              });
              return () => unsubscribe()
        }
        ,[] )
    const allvalues = {
        createUser,
        signinUser,
        signinWithGoogle,
        logOut,
        user,
        loading,
        updateUserProfile,
        signinWithGithub
    }
   
    return (
       
        <AuthContext.Provider value={allvalues}>
            {children}
        </AuthContext.Provider>
    );
};

export default FirebaseProvider;