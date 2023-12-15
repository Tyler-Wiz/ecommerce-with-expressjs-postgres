const express = require("express");
const router = express.Router();
const {
  read,
  readUnique,
  addProducts,
} = require("../controller/productController");

router.get("/", read);
router.get("/:id", readUnique);
router.post("/upload", addProducts);

module.exports = router;
