import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Images from './components/Images.jsx';
import NoMatch from './components/NoMatch.jsx';
import SavedImages from './components/SavedImages.jsx';
import facade from './util/apiFacade.js';

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userRoles = facade.getUserRoles(); // Assuming getUserRoles returns an array of roles

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Pass setIsLoggedIn as a prop to the App component */}
        <Route path="/" element={<App setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
        {/* Conditional rendering of routes based on isLoggedIn */}
        {isLoggedIn && (
          <Route>
            {/* Conditional rendering of 'Images' route */}
            {userRoles.includes('admin') || userRoles.includes('user') || userRoles.includes('manager') ? (
              <Route path="/images" element={<Images />} />
            ) : null}
            {/* Conditional rendering of 'SavedImages' route */}
            <Route path="/savedImg" element={<SavedImages />} />
            {/* Route for any other unmatched paths */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        )}
        {/* Default route when not logged in */}
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
