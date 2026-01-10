import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { userdata } from './context/usercontext';
import { Loading } from './components/loading';
import Navbar from './components/navbar';
import Pinpage from './pages/pinpage';
import Account from './pages/account';
import Userprofile from './pages/userprofile';
import ForgotPassword from './pages/forgotpassword';
import Resetpassword from './pages/reset';
import Board from './pages/Board';
import Selectpins from './pages/selectpins';
import EditNamePopup from './components/editnamepopup';
import Editprofiledp from './components/editprofiledppopup';
import Updatepassword from './pages/updatepassword';
import Mypins from './pages/mypins';
import Boardpins from './pages/boardpins';
import Create from './pages/create';
import Getstarted from './pages/getstarted';
import Aiimage from './pages/aiimage';
import SearchPage from './pages/searchpage';

import { pageVariants } from './components/animations';
import PageWrapper from './components/pagewrapper';
import PinPageSkeleton from './components/pinpageskeleton';

function App() {
  const { authLoading, isauth, user } = userdata();
  const location = useLocation();
  const navigate = useNavigate();

  // keep track of background page when navigating
  const state = location.state;
  const background = state && state.background;
  console.log("🚨🚨🚨 NEW FRONTEND CODE RUNNING");


if (authLoading) {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <Loading />
    </div>
  );
}

  return (
    <>
      {isauth && <Navbar user={user} />}

      {/* Render main routes */}
      <Routes location={background || location}>
        <Route path="/" element={isauth ? <Home /> : <Getstarted />}/>
        <Route path="/getstarted" element={isauth ? <Home /> : <Getstarted />} />
        <Route path="/searchpage" element={<SearchPage />} />
        <Route path="/account" element={isauth ? <Account user={user} /> : <Getstarted />} />
        <Route path="/user/:id" element={isauth ? <Userprofile user={user} /> : <Getstarted />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<Resetpassword />} />
        <Route path="/login" element={isauth ? <Home /> : <Login />} />
        <Route path="/updatepassword" element={isauth ? <Updatepassword /> : <Getstarted />} />
        <Route path="/register" element={isauth ? <Home /> : <Register />} />
        <Route path="/board" element={isauth ? <Board /> : <Getstarted />} />
        <Route path="/selectpins/:boardId" element={isauth ? <Selectpins /> : <Getstarted />} />
        <Route path="/mypins" element={isauth ? <Mypins /> : <Getstarted />} />
        <Route path="/aiimage" element={isauth ? <Aiimage /> : <Getstarted />} />
       
        <Route path="/boards/:boardId" element={isauth ? <Boardpins /> : <Getstarted />} />
        <Route path="/create" element={<Create onClose={() => navigate(-1)} />} />
      </Routes>

      {/* Render overlays only when background exists */}
      <AnimatePresence mode='sync'>
        {background && (
          <Routes location={location}>
            <Route
              path="/pin/:id"
              element={
                isauth ? (
                  
    <motion.div
  className="
    fixed inset-0 z-50
    flex items-center justify-center
    backdrop-blur-lg
  "
 initial={{
  opacity: 0,
  x: 60,
}}
animate={{
  opacity: 1,
  x: 0,
}}
exit={{
  opacity: 0,
  x: 60,
}}
transition={{
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1],
}}
style={{ willChange: "transform, opacity" }}

>
  {/* Pinpage here */}

  <Pinpage user={user} />
</motion.div>

                ) : (
                  <Getstarted />
                )
              }
            />

            <Route
              path="/editname"
              element={<EditNamePopup onClose={() => navigate("/account")} />}
            />
            <Route
              path="/editdp"
              element={<Editprofiledp onClose={() => navigate(-1)} />}
            />
          </Routes>
        )}
      </AnimatePresence>
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
