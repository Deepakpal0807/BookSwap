import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
const Login = lazy(() => import('./Pages/Login'));
const Navbar=lazy(()=> import('./Components/Navbar'))

function App() {
  const [count, setCount] = useState(0)

  return (
    <Suspense>
     <BrowserRouter>
       <Routes>
       <Route path="/" element={<Navbar/>} />
       <Route path="/login" element={<Login/>} />
       {/* <Route path="/about" element={<About />} /> */}


       </Routes>
     </BrowserRouter>

    </Suspense>
  )
}

export default App
