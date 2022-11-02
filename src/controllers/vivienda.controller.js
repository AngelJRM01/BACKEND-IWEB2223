const Vivienda = require("../models/Vivienda.model");
const Reserva = require("../models/Reserva.model");

// Create and Save a new Vivienda
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    
    // Create a Vivienda
    const vivienda = new Vivienda(req.body);
    
    // Save Vivienda in the database
    vivienda
        .save(vivienda)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Vivienda."
            });
        });
}

exports.findAll = (req, res) => {
    var query = {};

    const { direccion } = req.query;

    if (direccion) {
      query.direccion = { $regex: direccion, $options: 'i' };
    }

    Vivienda.find(query)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving viviendas."
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Vivienda.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({message: "Not found Vivienda with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Vivienda with id " + id });
        });
}

exports.update= (req, res) => {
    if (!req.body) {
        return res.status(400).send({ 
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Vivienda.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Vivienda with id=${id}. Maybe Vivienda was not found!`
        });
      } else res.send({ message: "Vivienda was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Vivienda with id=" + id
      });
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Vivienda.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Vivienda with id=${id}. Maybe Vivienda was not found!`
          });
        } else {
          res.send({
            message: "Vivienda was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Vivienda with id=" + id
        });
      });
}

exports.findReservas = (req, res) => {
  const { id } = req.params;
  var query = {"vivienda._id": id};

  Reserva.find(query)
      .then(data => {
          if(!data)
              res.status(404).send({message: "Not found Reservas with vivienda._id " + id});
          else res.send(data);
      })
      .catch(err => {
          res.status(500).send({ message: "Error retrieving Reservas with vivienda._id " + id });
      });
}

//Angel FC
exports.findByEstado = (req, res) => {
  const estado = req.params.estado;
  var query = {"estado": estado};

  Vivienda.find(query)
      .then(data => {
          if(!data)
              res.status(404).send({message: "Not found Vivienda with estado " + estado});
          else res.send(data);
      })
      .catch(err => {
          res.status(500).send({ message: "Error retrieving Vivienda with estado " + estado });
      });
}

// Galo
exports.findUnderPrice = (req, res) => {
  const { precio } = req.params;
  var query = {"precioNoche": {$lte: precio}};

  Vivienda.find(query)
      .then(data => {
          if(!data)
              res.status(404).send({message: "Not found Viviendas under " + precio});
          else res.send(data);
      })
      .catch(err => {
          res.status(500).send({ message: "Error retrieving Viviendas under " + precio });
      });
}

exports.findGuests = (req, res) => {
  const { id } = req.params;
  var query = {"vivienda._id": id};

  Reserva.find(query)
      .then(data => {
          if(!data)
              res.status(404).send({message: "Not found Guests with vivienda._id " + id});
          else res.send(data.map((reserva) => reserva.persona));
      })
      .catch(err => {
          res.status(500).send({ message: "Error retrieving Guests with vivienda._id " + id });
      });
}

exports.findOverRating = (req, res) => {
  const { valoracion } = req.params;
  var query = {"valoracion": {$gt: valoracion}};

  Vivienda.find(query)
      .then(data => {
        if(!data)
            res.status(404).send({message: "Not found Viviendas over " + valoracion + " of rating"});
        else res.send(data);
      })
      .catch(err => {
            res.status(500).send({ message: "Error retrieving Viviendas over " + valoracion + "of rating"});
      });
}

exports.findGuestsOfOwner = (req, res) => {
  const { id } = req.params;
  var query = {"propietario.id": id};
  var coleccion = [];
  var maxData=0;
  var maxData2=0;
  var intData=0;
  var intData2=0;
  var vecesEnviado = 0;

  Vivienda.find(query)
      .then(data => {
          if(data){
            maxData = data.length;
            data.map(d => {
              query = {"vivienda.id" : d._id};
              Reserva.find(query)
                  .then(data2 => {
                      if(data2){
                        intData = intData + 1;
                        maxData2 = data2.length;
                        intData2 = 0;
                        data2.map(d2 => {
                          intData2 = intData2 + 1;
                          coleccion.push(d2.persona);
                          if(intData2 === maxData2 && intData === maxData && vecesEnviado === 0){
                            vecesEnviado++;
                            res.send(coleccion)
                          }
                        })
                      }
                  })
            })
          };
      })
}

exports.findGuest = (req, res) => {
  const { id } = req.params;
  var query = {"propietario.id": id};
  let coleccion = [];

  Vivienda.find(query)
      .then(data => {
          if(data){
              
                          res.send(data);
        };
      })
}