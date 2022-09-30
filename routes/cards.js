const router = require("express").Router();
const path = require("path");
const fs = require("fs").promises;

const filepath = path.join(__dirname, "../data/cards.json");

router.get("/cards", (req, res) => {
  fs.readFile(filepath, { encoding: "utf8" })
    .then((data) => {
      const cards = JSON.parse(data);
      res.send(cards);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
