'use client'
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../fierbase";
import { useRouter } from 'next/navigation';


const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const router = useRouter();

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    const logout = () => {
        signOut(auth).then(
            () => {
                router.push("/")
            }
        )
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [user])

    return (<AuthContext.Provider value={{user, googleSignIn, logout}}>{children}</AuthContext.Provider>)
}

export const UserAuth = () => {
    return useContext(AuthContext)
}