import React, {useEffect, useState} from 'react'
import Navbar from './components/Navbar'
import { getAllKatas } from './services/kataService';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import KataDetailPage from './pages/KataDetailPage';
import Homepage from './pages/Homepage';

function App() {

  const [katas, setKatas] = useState([]);

try {
  const getKatas = async () => {
    const res = await getAllKatas()
    console.log(res.data)
   
  }
  getKatas()
} catch (error) {
  console.log(error)
}
  

   
  /*useEffect(() => {
  getAllKatas().then((response) => {
    if( response.data.katas ){
        console.table(response.data);
        let  katas = response.data;
        setKatas(katas);
        } 


      }).catch((error) => console.error(`[Get All Katas Error] ${error}`))
 
}, [])*/


  return (
    <div>
    <Navbar />
    <BrowserRouter>
    <Routes>
          {/* Routes definition */}
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          
          <Route path='/katas/:id' element={<KataDetailPage />} />
          {/* Redirecto when Page Not Found */}
          <Route 
            path='*' 
            element={<Navigate to='/' replace />}>
          </Route>
        </Routes>
    )

    </BrowserRouter>
    
    </div>
  )
}

export default App