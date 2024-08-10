import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Images from './components/Images.jsx';
import NoMatch from './components/NoMatch.jsx';
import AdminUsers from './components/admin/AdminUsers.jsx';
import SavedImages from './components/SavedImages.jsx';
import AdminUserSavedImages from './components/admin/AdminUserSavedImages.jsx';
import AdminUserImages from './components/admin/AdminUserImages.jsx';
import Login from './components/LogIn.jsx';
import SignUp from './components/SignUp.jsx';
import facade from './util/apiFacade.js';
import './index.css';

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(facade.getToken() !== null);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      const roles = facade.getUserRoles();
      console.log("User roles after login:", roles); // Debugging line
      setUserRoles(roles);
    } else {
      setUserRoles([]);
    }
  }, [isLoggedIn]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<App setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRoles={setUserRoles} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="images" 
          element={isLoggedIn && userRoles.includes('user') ? <Images /> : <Navigate to="/login" />} 
        />
        <Route 
          path="savedImg" 
          element={isLoggedIn && (userRoles.includes('admin') || userRoles.includes('user')) ? <SavedImages /> : <Navigate to="/login" />} 
        />
        <Route 
          path="admin/users" 
          element={isLoggedIn && userRoles.includes('admin') ? <AdminUsers /> : <Navigate to="/login" />} 
        />
        <Route 
          path="admin/users/:username" 
          element={isLoggedIn && userRoles.includes('admin') ? <AdminUserSavedImages /> : <Navigate to="/login" />} 
        />
        <Route 
          path="admin/images/:username" 
          element={isLoggedIn && userRoles.includes('admin') ? <AdminUserImages /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
