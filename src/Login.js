import { Button } from '@material-ui/core'
import React from 'react'
import "./Login.css"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import { setUserDetails,  createUser} from './getUserDetails';
import db from './firebasedb';
import {collection, getDocs, query, where } from "@firebase/firestore";
const provider = new GoogleAuthProvider();
const auth = getAuth();

export default function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider)
        .then( async (result) => {
            console.log(result);
            const Room = query(collection(db, "Room"), where("email", "==", result.user.email));
            const docSnap = await getDocs(Room)
            if (!docSnap.empty) {
                docSnap.forEach((doc) => {
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: setUserDetails(doc.data(), doc.id)
                    });
                });
            } else {
                const user = createUser(result.user);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: user
                });
            }
        }).catch((error) => {
            alert(error.message);
            // // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // // ...
        });
    }
    return (
       <div className="login">
           <div className="login_container">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png" alt="" />
               <div className="login_text">
                   <h1>Sign in to WhatsApp</h1>
               </div>
               <Button onClick={signIn}>Sign In with Google</Button>
           </div>
       </div>
    )
}
