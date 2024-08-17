import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { lazy, Suspense } from 'react';

// Lazy-loaded components
const Login = lazy(() => import('./Pages/Login'));
const Bookadd = lazy(() => import('./Pages/Bookadd'));
const Profile = lazy(() => import('./Pages/Profile'));
const Notfound = lazy(() => import('./Pages/NotFound'));
const Home = lazy(() => import('./Pages/Home'));

import ProtectRoute from "./auth/ProtectRoute";
import Loader from './Components/Loader';
import { setUser } from './redux/User/userslice';
import Profileurl from './Components/profileurl';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from local storage if available
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      dispatch(setUser(user));
    }
    setLoading(false); // User state has been loaded
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (loading) {
    return <Loader />; // Show a loading spinner while the user state is being initialized
  }

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          {/* Protected Route for Home */}
          <Route 
            path="/" 
            element={
              <ProtectRoute user={isLoggedIn}>
                <Home />
              </ProtectRoute>
            } 
          />

          {/* Protected Route for Profile */}
          <Route 
            path="/profile" 
            element={
              <ProtectRoute user={isLoggedIn}>
                <Profile />
              </ProtectRoute>
            } 
          />

          {/* Protected Route for Add Book */}
          <Route 
            path="/addbook" 
            element={
              <ProtectRoute user={isLoggedIn}>
                <Bookadd />
              </ProtectRoute>
            } 
          />

          {/* Protected Route for Profile URL */}
          <Route 
            path="/profile/:profileId" 
            element={
              <ProtectRoute user={isLoggedIn}>
                <Profile />
              </ProtectRoute>
            } 
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={
              <ProtectRoute user={!isLoggedIn} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          {/* Catch-all Route for 404 */}
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
