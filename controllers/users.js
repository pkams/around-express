const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Error" }));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("Nenhum usuário encontrado com esse id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode == 404) {
        res.status(404).send({ message: "Cartão ou usuário não encontrado" });
      } else {
        res.status(500).send({ message: "Error" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name == "ValidationError") {
        res.status(400).send({
          message:
            "Dados inválidos passados aos métodos para criar um cartão/usuário",
        });
      } else {
        res.status(500).send({ message: "Error" });
      }
    });
};
