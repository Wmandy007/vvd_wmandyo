const express = require("express");
const User = require("../controllers/user");

const router = express.Router();

router.get("/", User.show);
router.get("/:id", User.showById);
router.patch("/update/:id", User.update);
router.delete("/:id", User.destroy);
router.patch("/activateuser/:id", User.activateUser);

module.exports = router;
