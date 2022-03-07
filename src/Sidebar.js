import { Avatar, IconButton } from '@material-ui/core';
import { Chat, DonutLargeRounded, MoreVertOutlined, SearchOutlined } from '@material-ui/icons';
import React, {useState, useEffect} from 'react'
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import db from "./firebasedb";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [{user}, dispatch] = useStateValue();
    const [rooms, setRoom] = useState([]);
    useEffect(() => {
        const Room = query(collection(db, "Room"), where("email", "!=", user?.email));
        const unsubsribe = onSnapshot(Room, (doc) => {
                let data = []
                doc.forEach((document) => {
                    const user = {
                        id: document.id, 
                        data: document.data()
                    };
                    data.push(user);
                })
                setRoom(data);
            })
        return () => {
            unsubsribe();
        }
    }, []);

    return (
        <div className="sidebar">
            <div className="siderbar_header">
            <Avatar src={user?.photo}/> 
            <h3>{user?.name}</h3>
            <div className="siderbar_headerRight">
                <IconButton>
                    <DonutLargeRounded/>
                </IconButton>
                <IconButton>
                <Chat/>
                </IconButton>
                <IconButton>
                <MoreVertOutlined/>
                </IconButton>      
            </div>
            </div>
            <div className="siderbar_search">
            <div className="siderbar_searchContainer">
            <SearchOutlined/>
            <input type="text" placeholder="Search or start new chat" />
            </div>
                
            </div>
            <div className="siderbar_chat">
                <SidebarChat addNewChat={true}/>
                {rooms.map(room => {
                   return <SidebarChat addNewChat={false} key={room.id} id={room.id} name={room.data.name} />
                })}
            </div>
        </div>
    )
}

export default Sidebar
