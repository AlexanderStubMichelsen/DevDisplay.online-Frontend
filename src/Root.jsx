// filepath: c:\Projekter\Maskinen\src\Root.jsx
import React, { useState } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App.jsx";
import Images from "./components/Images.jsx";
import NoMatch from "./components/NoMatch.jsx";
import Youtube from "./components/Youtube.jsx";
import Help from "./components/Help.jsx";
import UserPage from "./components/UserPage.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import Saved from "./components/Saved.jsx";
import Trends from "./components/Trends.jsx";
import About from "./components/About.jsx";
import Privacy from "./components/Privacy.jsx"; // Import Privacy Policy component
import PrivacyPolicyOrganizedNotes from "./components/PrivacyPolicyOrganized.jsx";

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<App setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
        <>
          <Route path="images" element={<Images />} />
          <Route path="youtube" element={<Youtube />} />
          <Route path="trends" element={<Trends />} />
          <Route path="help" element={<Help />} />
          <Route path="userpage" element={<UserPage />} />
          <Route path="saved" element={<Saved />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="privacypolicy" element={<Privacy />} />
          <Route path="privacyPolicyON" element={<PrivacyPolicyOrganizedNotes />} />
        </>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Root;