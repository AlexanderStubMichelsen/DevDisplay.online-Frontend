import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route, 
  Outlet} from 'react-router-dom'
import Images from './components/Images.jsx'
import NoMatch from './components/NoMatch.jsx'

const [isLoggedIn, setIsLoggedIn] = useState(false);

const router = createBrowserRouter(createRoutesFromElements(

  <Route>
      <Route path="/" element={<App />} />
      <Route path="images" element={<Images />} />
      {/* Other routes */}
    </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
