const router = require("express").Router();
const path = require("path");
const fs = require("fs");

const filepath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(filepath, "utf8"));

router.get("/users/:id", (req, res) => {
  const user = users.find((obj) => obj._id === req.params.id);
  if (!user) {
    res.status(404).send("ID do usuário não encontrado");
  } else {
    res.send(user);
  }
});

router.get("/users", (req, res) => {
  res.send(users);
});

module.exports = router;
