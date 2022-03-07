import { addDoc, collection, getDocs, query, where } from "@firebase/firestore"
import db from "./firebasedb"

export const getUserDetails = (user) => {
    return {
        name: user.displayName,
        email:user.email,
        photo:user.photoURL, 
        timestamp: new Date().toUTCString()
    }
}

export const setUserDetails = (user, id) => {
    return {
        ...user,
        id : id
    }
}
export async function checkUserExist(user) {
    const Room = query(collection(db, "Room"), where("email", "==", user.email));
    const docSnap = await getDocs(Room)
    if (!docSnap.empty) {
        docSnap.forEach(async (doc) => {
            return await setUserDetails(doc.data(), doc.id);
        });
    } else {
        createUser(user)
    }
}
export const createUser = async (user) => {
    try {
        const docRef = await addDoc(collection(db, "Room"), getUserDetails(user));
        console.log("Document written with ID: ", docRef.id);
        return setUserDetails(user, docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const createMessage = async (message, roomId, user) => {
    try {
        if (roomId > user) {
            const docRef = await addDoc(collection(db, "Message", roomId, user), message);
            console.log("Document written with ID: ", docRef.id);
        } else {
            const docRef = await addDoc(collection(db, "Message", user, roomId), message);
            console.log("Document written with ID: ", docRef.id);
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
