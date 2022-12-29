const Comentario = require("../models/Comentario.model");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    
    const comentario = new Comentario(req.body);
    
    comentario
        .save(comentario)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Comentario."
            });
        });
}

exports.findAll = (req, res) => {
    Comentario.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Comentarios."
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Comentario.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Comentario with id " + id });
            else res.json(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Comentario with id=" + id });
        });
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Comentario.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Comentario with id=${id}. Maybe Comentario was not found!`
                });
            } else res.json({ message: "Comentario was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Comentario with id=" + id
            });
        });
}


exports.delete = (req, res) => {
    const id = req.params.id;
    
    Comentario.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                  message: `Cannot delete Comentario with id=${id}. Maybe Comentario was not found!`
                });
            } else {
                res.send({
                    message: "Comentario was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Comentario with id=" + id
            });
        });
}

exports.findByVivienda = (req, res) => {
    const vivienda = req.params.vivienda;
    let query = {"vivienda": vivienda};
  
    Comentario.find(query)
        .then(data => {
            if(!data)
                res.status(404).send({message: "Not found Comentario with vivienda " + vivienda});
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Comentario with vivienda " + vivienda });
        });
  }