import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import {collection, addDoc } from 'firebase/firestore';
import db from './firebasedb';
import { Link } from 'react-router-dom';

export default function SidebarChat(props) {
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);

    const createChat = async () => {
        const roomName = prompt("Please enter the name for the chat");

        if (roomName) {
            try {
                const docRef = await addDoc(collection(db, "Room"), {
                    name: roomName,
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }
    return !props.addNewChat ?  (
        <Link to={`/room/${props.id}`}><div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarchat_info">
                <h2>{props.name}</h2>
                <p>Last Message</p>
            </div>
        </div></Link> ) : (
            <div  onClick={createChat}
            className="sidebarChat">
                <h2>Add new Chat</h2>
            </div>
        )
}
