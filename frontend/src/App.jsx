import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { lazy, Suspense } from 'react';

// Lazy-loaded components
const Login = lazy(() => import('./Pages/Login'));
const Bookadd = lazy(() => import('./Pages/Bookadd'));

const Profile = lazy(() => import('./Pages/Profile'));
const Notfound=lazy(()=> import('./Pages/NotFound'))
const Home=lazy(()=> import("./Pages/Home"))

import ProtectRoute from "./auth/ProtectRoute";
import Loader from './Components/Loader';
import { setUser } from './redux/User/userslice';


function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Load user data from local storage if available
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      dispatch(setUser(user));
    }
  }, [dispatch]);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // const isLoggedIn=false;

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          {/* Protected Routes */}
          <Route element={<ProtectRoute user={isLoggedIn} />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addbook" element={<Bookadd />} />
          </Route>

          {/* Login Route */}
          <Route
            path="/login"
            element={
              <ProtectRoute user={!isLoggedIn} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
           <Route path="*" element={<Notfound/>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
