const express = require("express");
const {
  createClient,
  getClient,
  getClientById,
  removeClient,
  updateClient,
} = require("../controllers/client");
const router = express.Router();
router.post("/create", createClient);
router.get("/", getClient);
router.get("/:id", getClientById);
router.delete("/:id", removeClient);
router.patch("/:id", updateClient);
module.exports = router;
