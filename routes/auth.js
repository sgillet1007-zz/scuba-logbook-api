const express = require("express");
const {
  register,
  login,
  logout,
  getUser,
  forgotPw,
  resetPw,
  updateDetails,
  updatePw,
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user", protect, getUser);

router.put("/user/details", protect, updateDetails);
router.put("/user/pw", protect, updatePw);

router.post("/user/pw/forgot", forgotPw);
router.put("/user/pw/reset/:resettoken", resetPw);

module.exports = router;
