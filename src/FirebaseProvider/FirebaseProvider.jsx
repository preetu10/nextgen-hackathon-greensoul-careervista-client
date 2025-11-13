/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import useAxiosPublic from "../customHooks/useAxiosPublic";

//import { useLocation, useNavigate } from "react-router-dom";
export const AuthContext = createContext(null);

//social providers
const googleProvider = new GoogleAuthProvider();

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  console.log(loading);
  console.log(user);
  //create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  //signin user
  const signinUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //navigation system

  //google login
  const signinWithGoogle = () => {
    setLoading(true);
    return  signInWithPopup(auth, googleProvider).then((result) => {
      if (result.user) {
        console.log(result.user);
      }
    });
  };


  const logOut = () => {
    setLoading(true);
    setUser(null);

    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // if (currentUser) {
      //  setUser(currentUser)
      //  saveUser(user)
      //  setLoading(false)
      // } else {
      //   // User is signed out
      //   // ...
      //   setLoading(false)
      // }
      if (currentUser) {
        setUser(currentUser)
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/api/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            // console.log(res.data.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [axiosPublic]);
  const allvalues = {
    createUser,
    signinUser,
    signinWithGoogle,
    logOut,
    user,
    loading,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={allvalues}>{children}</AuthContext.Provider>
  );
};

export default FirebaseProvider;
