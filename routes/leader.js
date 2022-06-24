const express = require("express");
const Leader = require("../controllers/leader");

const router = express.Router();

router.get("/:client", Leader.index);
router.get("/episode/:episode_id/:client_id", Leader.show);


module.exports = router;
