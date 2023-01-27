const Projet = require("../models/projet");

exports.get_projets = async (req, res) => {
  try {
    const projets = await Projet.find({});
    res.status(200).send(projets);
  } catch (error) {
    res.status(404).send({ error });
  }
};
