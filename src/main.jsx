import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Images from './components/Images.jsx';
import NoMatch from './components/NoMatch.jsx';

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Pass setIsLoggedIn as a prop to the App component */}
        <Route path="/" element={<App setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
        {/* Conditional rendering of the Images route based on isLoggedIn */}
        {isLoggedIn && <Route path="images" element={<Images />} />}
        {/* Other routes */}
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
