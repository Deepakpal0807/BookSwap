import './App.css'
import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

// import ImageTest from './Pages/ImageTest';
const Login = lazy(() => import('./Pages/Login'));
const Bookadd = lazy(() => import('./Pages/Bookadd'));
const Navbar=lazy(()=> import('./Components/Navbar'))
const Profile=lazy(()=> import('./Pages/Profile'))

function App() {
  const [count, setCount] = useState(0)

  return (
    <Suspense>
     <BrowserRouter>
       <Routes>
       <Route path="/" element={<Navbar/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/addbook" element={<Bookadd />} />
       


       </Routes>
     </BrowserRouter>

    </Suspense>
  )
}

export default App
