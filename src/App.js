import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import React, {useState} from 'react';
import {BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const[{user}, dispatch] = useStateValue()
  return (
    <div className="app">
    {!user ? (<Login/>) : (
      <div className="app_body">
      <Router>
        <Sidebar/>
          <Routes>
            <Route path="/room/:roomId" element={<Chat/>}/>
          </Routes>
        </Router>
      </div>)}
  </div>);
}

export default App;

