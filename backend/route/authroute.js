const express = require("express");
const {
  loginController,
  registerController,
  tester,
  forgotPasswordController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

//router object
const router = express.Router();

//routing

// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || METHOD POST
router.post("/login", loginController);

// test || protected route
router.post("/forgot-password", forgotPasswordController);

// forgot password route
router.get("/test", requireSignIn, isAdmin, tester);

// protected user route needs auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// protected  Admin route needs auth
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});


module.exports = router;
