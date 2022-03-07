import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import "./Chat.css"
import db from './firebasedb';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useStateValue } from './StateProvider';
import { createMessage } from './getUserDetails';

function Chat() {
    const [{user}, dispatch] = useStateValue();
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messagesList, UpdateMessagesList] = useState([]);
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);
    useEffect(() => {
        if (roomId) {
            const q = query(collection(db, "Room"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.id == roomId) {
                        setRoomName(doc.data().name)
                    }
                });
            });
            return () => {
                unsubscribe();
            }
        }
    }, [roomId]);

    useEffect(() => {
        if (roomId) {
            let q;
            if (roomId > user.id) {
                q = query(collection(db, "Message", roomId, user.id), orderBy('timestamp'));
            } else {
                q = query(collection(db, "Message", user.id, roomId), orderBy('timestamp'));
            }
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let message = []
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    message.push(data);
                });
                UpdateMessagesList(message);
            });
            return () => {
                unsubscribe();
            }
        }
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        const message = {
            message: input,
            Sentby: user.id,
            timestamp: new Date()
        }
        createMessage(message, roomId, user.id);
    }
    return (
        <div className="chat">
            <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="chat_header_info">
                <h3>{roomName}</h3>
                <p>Last seen...</p>
            </div>
            <div className="chat_header_right">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>   
            </div>
            </div>
            <div className="chat_body">
            {messagesList.map((message, index) => {
                return (
                    <p key={index} className={`chat_message ${message.Sentby === user.id && 'chat_receiver'}`}>
                        <span className="chat_name">
                            {message.Sentby !== user.id ? roomName : user.name}
                        </span>
                            {message.message}
                        <span className="chat_timestamp">
                            10:10am
                        </span>
                    </p>
                )
            })}   
            </div>
            <div className="chat_footer">
            <InsertEmoticon/>
            <form>
                <input type="text" name="message" value={input} onChange={(event) => setInput(event.target.value)}/>
                <button onClick={sendMessage}type="submit">Send a message</button>
            </form>
            <Mic/>
            </div>
        </div>
    )
}

export default Chat
