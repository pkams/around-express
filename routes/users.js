const router = require("express").Router();
const path = require("path");
const fs = require("fs").promises;

const filepath = path.join(__dirname, "../data/users.json");

router.get("/users/:id", (req, res) => {
  fs.readFile(filepath, { encoding: "utf8" })
    .then((data) => {
      const user = JSON.parse(data).find((obj) => obj._id === req.params.id);
      if (!user) {
        res.status(404).send({ message: "ID do usuário não encontrado" });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/users", (req, res) => {
  fs.readFile(filepath, { encoding: "utf8" })
    .then((data) => {
      const users = JSON.parse(data);
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
