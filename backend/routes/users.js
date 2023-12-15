const express = require("express");
const router = express.Router();
const {
  read,
  readUnique,
  updateUserById,
  deleteUserById,
} = require("../controller/userController");

// Get All users
router.get("", read);
// Get Unique User by ID
router.get("/:id", readUnique);
// Update User By ID
router.put("/:id", updateUserById);
// Delete User by Id
router.delete("/:id", deleteUserById);

module.exports = router;
