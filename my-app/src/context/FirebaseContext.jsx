import React, {createContext, useState, useEffect, Children} from "react";
import { auth, firestore, storage } from "../firebase/setup";

const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) =>{
    const[firebaseUser, setFirebaseUser ] = useState(null);

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(setFirebaseUser);
        return unsubscribe;
    },[]);

    return(
        <FirebaseContext.Provider value={{firebase: {firestore,storage}, user: firebaseUser}}>
            {children}
        </FirebaseContext.Provider>
    )
}

export {FirebaseContext, FirebaseProvider};