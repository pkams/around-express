const User = require("../models/card");

module.exports.getCards = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Error" }));
};

module.exports.deleteCard = (req, res) => {
  User.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new Error("Nenhum cartão encontrado com esse id");
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

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  User.create({ name, link, owner })
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
