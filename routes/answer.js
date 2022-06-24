const express = require("express");
const {
    createAnswer,
    getAnswerByUser,
    createPreAssAnswer,
    getPreAssAnswerByUser,
    getPreAssAnswerByUser1
} = require("../controllers/answer");
const router = express.Router();

router.post("/create", createAnswer);
router.post("/create/pre", createPreAssAnswer);

router.get("/pre/:client_id", getPreAssAnswerByUser);
router.get("/pre/user/:user_id", getPreAssAnswerByUser1);

router.get("/:user_id", getAnswerByUser);




module.exports = router;
