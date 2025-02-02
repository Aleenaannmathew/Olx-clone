import React from 'react'
import Navbar from './components/Navbar'
import Main from './components/Main'
import { Routes, Route } from 'react-router-dom';
import Details from './components/Details'
import Sell from './components/Sell';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import { FirebaseProvider } from './context/FirebaseContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    
    <AuthProvider>
      <FirebaseProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sell' element={<Sell/>}/>
      </Routes>
      </FirebaseProvider>
     </AuthProvider>
    
  )
}

export default App
