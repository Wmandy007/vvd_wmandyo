const express = require("express");
const multipleImages = require("../config/multipleImage");
const {
  createClient,
  getClient,
  getClientById,
  removeClient,
  updateClient,
} = require("../controllers/client");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const multipleUpload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).array("file", 1);
router.post("/create", multipleUpload, multipleImages, createClient);
router.get("/", getClient);
router.get("/:id", getClientById);
router.delete("/:id", removeClient);
router.patch("/:id", multipleUpload, multipleImages, updateClient);
module.exports = router;