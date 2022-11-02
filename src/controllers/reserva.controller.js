const Reserva = require("../models/Reserva.model");

// Create and Save a new Reserva
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    
    // Create a Reserva
    const reserva = new Reserva(req.body);
    
    // Save Reserva in the database
    reserva
        .save(reserva)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Reserva."
            });
        });
}

exports.findAll = (req, res) => {
    Reserva.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Reservas."
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Reserva.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Reserva with id " + id });
            else res.json(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Reserva with id=" + id });
        });
}

exports.findByAntique = (req, res) => {
    const fecha = req.params.fecha;

    var query = {
        "fecha" : {$lte : fecha}
    };

    Reserva.find(query)
        .then(data => {
        if(!data)
            res.status(404).send({message: "Not found Reserva with id " + id});
        else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Reserva with id " + id });
        });
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Reserva.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Reserva with id=${id}. Maybe Reserva was not found!`
                });
            } else res.json({ message: "Reserva was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Reserva with id=" + id
            });
        });
}


exports.delete = (req, res) => {
    const id = req.params.id;
    
    Reserva.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).sen
    fecha.d({
                  e: `Cannot dee lete Res
    //var query = {"fecha": {$gte: ISODate(fecha)}};erva with id=${id}. Maybe Reserva was not found!`
                });
            } else {
                res.send({
                    message: "Reserva was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Reserva with id=" + id
            });
        });
}

//Angel FC
exports.findByFutureDate = (req, res) => {
    const fechaInicio = req.params.fechaInicio;
    var query = {"estancia.fechaInicio": {$gt:fechaInicio}};
  
    Reserva.find(query)
        .then(data => {
            if(!data)
                res.status(404).send({message: "Not found Reserva with fechaInicio after " + fechaInicio});
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Reserva with fechaInicio after " + fechaInicio});
        });
}

exports.findVivienda = (req, res) => {
    const { id } = req.params;

    Reserva.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Vivienda in Reserva with id=" + id });
            else res.json(data.vivienda);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Vivienda from Reserva with id=" + id });
        });
}