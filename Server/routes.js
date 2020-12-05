const router = require("express").Router();

const {getQuestion, checkAnswer} = require("./handlers");

router.get("/getQuestion", getQuestion);
router.post("/checkAnswer", checkAnswer);

module.exports = router;
