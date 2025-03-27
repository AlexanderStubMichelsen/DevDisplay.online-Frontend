import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App.jsx';
import Images from './components/Images.jsx';
import NoMatch from './components/NoMatch.jsx';
import './index.css';
import Youtube from './components/Youtube.jsx';
import Help from './components/Help.jsx';
import UserPage from './components/UserPage.jsx';
import ChangePassword from './components/ChangePassword.jsx';

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Pass setIsLoggedIn as a prop to the App component */}
        <Route path="/" element={<App setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
          <>
            {/* Conditional rendering of 'Images' route */}
              <Route path="images" element={<Images />} />
              <Route path="youtube" element={<Youtube />} />
              <Route path="help" element={<Help />} />
              {/* show if localstorage contains an isLoggedIn */}
              <Route path="userpage" element={<UserPage />} />
              <Route path="changepassword" element={<ChangePassword />} />
              <Route path="*" element={<NoMatch />} />
          </>        
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
