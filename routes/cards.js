const router = require("express").Router();
const path = require("path");
const fs = require("fs");

const filepath = path.join(__dirname, "../data/cards.json");
const cards = JSON.parse(fs.readFileSync(filepath, "utf8"));

router.get("/cards", (req, res) => {
  res.send(cards);
});

module.exports = router;
