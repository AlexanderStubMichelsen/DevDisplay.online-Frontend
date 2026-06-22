// filepath: c:\Projekter\Maskinen\src\Root.jsx
import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import App from "./App.jsx";
import BackgroundLoop from "./components/modules/BackgroundLoop.jsx";
import flowersLoop from "./assets/flowersloop.mp4";
import Images from "./components/pages/Images.jsx";
import NoMatch from "./components/pages/NoMatch.jsx";
import Youtube from "./components/pages/Youtube.jsx";
import Help from "./components/pages/Help.jsx";
import UserPage from "./components/pages/UserPage.jsx";
import ChangePassword from "./components/pages/ChangePassword.jsx";
import Saved from "./components/pages/Saved.jsx";
import About from "./components/pages/About.jsx";
import PrivacyPolicyTetris from "./components/google_play_console/PrivacyPolicyTetris.jsx"; // Import Privacy Policy component
import PrivacyPolicyOrganizedNotes from "./components/google_play_console/PrivacyPolicyOrganized.jsx";
import DeleteUser from "./components/pages/DeleteUser.jsx";
import Contact from "./components/pages/Contact.jsx"; // Import Contact component
import CookieConsent from "./components/modules/CookieConsent.jsx";
import CookiePolicy from "./components/pages/CookiePolicy.jsx";

const PageTransitionLayout = () => {
  const location = useLocation();

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
      <BackgroundLoop
        src={flowersLoop}
        className="video-bg"
        showOverlay
        overlayOpacity={0.3}
        zIndex={0}
        position="fixed"
      />
      <AnimatePresence mode="wait" initial={true}>
        <motion.main
          key={`${location.pathname}${location.search}${location.hash}`}
          initial={{ opacity: 0, y: 18, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.995 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <CookieConsent />
    </div>
  );
};

const Root = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<PageTransitionLayout />}>
        <Route path="/" element={<App />} />
        <Route path="images" element={<Images />} />
        <Route path="youtube" element={<Youtube />} />
        <Route path="help" element={<Help />} />
        <Route path="userpage" element={<UserPage />} />
        <Route path="saved" element={<Saved />} />
        <Route path="changepassword" element={<ChangePassword />} />
        <Route path="deleteuser" element={<DeleteUser />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cookie-policy" element={<CookiePolicy />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="PrivacyPolicy" element={<PrivacyPolicyTetris />} />
        <Route path="privacyPolicyOrganizedNotes" element={<PrivacyPolicyOrganizedNotes />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Root;
