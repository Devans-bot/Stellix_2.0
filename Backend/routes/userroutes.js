import express from "express"
import { followunfollow, forgotpassword, getUserProfile, login, logoutuser, myprofile, registeruser, resetpassword, updatepassword, updateProfilePicture, updateusername } from "../controllers/usercontrollers.js"
import { isauth } from "../middlewears/isauth.js"
import uploadfile from "../middlewears/multer.js";

const router=express.Router()

router.post("/register", registeruser);
router.post("/login", login);
router.get("/logout", logoutuser);

router.post("/forgot-password", forgotpassword);
router.post("/reset-password", resetpassword);
router.post("/reset-password/:token", resetpassword);

router.get("/me", isauth, myprofile);
router.post("/username", isauth, updateusername);
router.post("/updatepassword", isauth, updatepassword);

// 👥 SOCIAL
router.post("/follow/:id", isauth, followunfollow);
router.post("/dp/:id", isauth, uploadfile, updateProfilePicture);

// ⚠️ ALWAYS LAST
router.get("/:id", getUserProfile);

export default router   