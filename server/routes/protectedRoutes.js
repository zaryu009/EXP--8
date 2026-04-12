const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { listUsers } = require("../services/userStore");

const router = express.Router();

router.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Dashboard data fetched successfully.",
    user: req.user,
  });
});

router.get("/admin", authMiddleware, authorizeRoles("admin"), async (req, res, next) => {
  try {
    const users = await listUsers();

    res.status(200).json({
      message: "Admin data fetched successfully.",
      currentUser: req.user,
      users,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/admin/users",
  authMiddleware,
  authorizeRoles("admin"),
  async (req, res, next) => {
    try {
      const users = await listUsers();

      res.status(200).json({
        message: "Users fetched successfully.",
        users,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
