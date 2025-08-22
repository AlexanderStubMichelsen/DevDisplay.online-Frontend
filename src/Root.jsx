// filepath: c:\Projekter\Maskinen\src\Root.jsx
import React, { useState } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App.jsx";
import Images from "./components/pages/Images.jsx";
import NoMatch from "./components/pages/NoMatch.jsx";
import Youtube from "./components/pages/Youtube.jsx";
import Help from "./components/pages/Help.jsx";
import UserPage from "./components/pages/UserPage.jsx";
import ChangePassword from "./components/pages/ChangePassword.jsx";
import Saved from "./components/pages/Saved.jsx";
import Trends from "./components/pages/Trends.jsx";
import About from "./components/pages/About.jsx";
import PrivacyPolicyTetris from "./components/google_play_console/PrivacyPolicyTetris.jsx"; // Import Privacy Policy component
import PrivacyPolicyOrganizedNotes from "./components/google_play_console/PrivacyPolicyOrganized.jsx";
import DeleteUser from "./components/pages/DeleteUser.jsx";
import Board from "./components/pages/Board.jsx";
import Contact from "./components/pages/Contact.jsx"; // Import Contact component

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<App setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
        <>
          <Route path="board" element={<Board />} />
          <Route path="images" element={<Images />} />
          <Route path="youtube" element={<Youtube />} />
          <Route path="trends" element={<Trends />} />
          <Route path="help" element={<Help />} />
          <Route path="userpage" element={<UserPage />} />
          <Route path="saved" element={<Saved />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="deleteuser" element={<DeleteUser />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="PrivacyPolicy" element={<PrivacyPolicyTetris />} />
          <Route path="privacyPolicyOrganizedNotes" element={<PrivacyPolicyOrganizedNotes />} />
        </>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Root;