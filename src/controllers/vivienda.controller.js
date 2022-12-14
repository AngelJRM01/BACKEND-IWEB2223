const Vivienda = require("../models/Vivienda.model");
const Reserva = require("../models/Reserva.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const vivienda = new Vivienda(req.body);

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

  Vivienda.find()
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
      if (!data)
        res.status(404).send({ message: "Not found Vivienda with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Vivienda with id " + id });
    });
}

exports.update = (req, res) => {
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
  let query = { "vivienda._id": id };

  Reserva.find(query)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Reservas with vivienda._id " + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Reservas with vivienda._id " + id });
    });
}

exports.findGuests = (req, res) => {
  const { id } = req.params;
  let query = { "vivienda._id": id };

  Reserva.find(query)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Guests with vivienda._id " + id });
      else res.send(data.map((reserva) => reserva.persona));
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Guests with vivienda._id " + id });
    });
}

exports.findGuestsOfOwner = (req, res) => {
  const { id } = req.params;
  let query = { "propietario.id": id };
  let coleccion = [];
  let vecesEnviado = 0;
  let intData = 0;

  Vivienda.find(query)
    .then(data => {
      if (data.length == 0) {
        res.status(404).send({ message: "Not found Viviendas of Owner " + id });
      } else {
        data.map(d => {
          let query2 = { "vivienda._id": d._id };
          Reserva.find(query2)
            .then(data2 => {
              intData++;
              if (data2.length != 0) {
                data2.map((d2, index2) => {
                  coleccion.push(d2.persona);
                  if (index2 == data2.length - 1 && intData == data.length && vecesEnviado == 0) {
                    vecesEnviado++;
                    res.send(coleccion)
                  }
                })
              } else {
                if (intData == data.length && vecesEnviado == 0) {
                  vecesEnviado++;
                  res.send(coleccion)
                }
              }
            })
            .catch(err => {
              res.status(500).send({ message: "Error retrieving Reservas of Viviendas of Owner " + id });
            });
        })
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Viviendas of Owner " + id });
    });
}

exports.findViviendasOfOwner = (req, res) => {
  const { id } = req.params;
  let query = { "propietario._id": id };

  Vivienda.find(query)
    .then(data => {
      if (data.length == 0) {
        res.send([])
      } else {
        res.send(data);
      }
    })
}

exports.findOwners = (req, res) => {

  Vivienda.find().distinct('propietario')
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

exports.findByFiltro = (req, res) => {

  const params = req.query;
  let query = {};

  if (params.valoracion) {
    query['valoracion'] = { $gte: params.valoracion };
  }

  if (params.precio) {
    query['precioNoche'] = { $lte: params.precio };
  }

  if (params.capacidad) {
    query['capacidad'] = { $gte: params.capacidad };
  }

  if (params.estado) {
    query['estado'] = { $regex: params.estado, $options: 'i' };
  }

  if (params.direccion) {
    query['direccion'] = { $regex: params.direccion, $options: 'i' };
  }

  if (params.propietario) {
    query['propietario.nombre'] = { $regex: params.propietario, $options: 'i' };
  }

  if (params.lat && params.lon && params.prox) {
    query['coordenadas.latitud'] = { $lte: parseFloat(params.lat) + parseFloat(params.prox), $gte: params.lat - params.prox };
    query['coordenadas.longitud'] = { $lte: parseFloat(params.lon) + parseFloat(params.prox), $gte: params.lon - params.prox };
  }

  if (params.fechaInicio && params.fechaFinal) {
    query['$nor'] = [
      {
        'fechasNoDisponibles': {
          '$elemMatch': {
            'fechaInicio': {
              '$gte': new Date(params.fechaInicio ? params.fechaInicio : 0),
              '$lte': new Date(params.fechaFinal ? params.fechaFinal : 0)
            }
          }
        }
      }, {
        'fechasNoDisponibles': {
          '$elemMatch': {
            'fechaFinal': {
              '$gte': new Date(params.fechaInicio ? params.fechaInicio : 0),
              '$lte': new Date(params.fechaFinal ? params.fechaFinal : 0)
            }
          }
        }
      },
      {
        'fechasNoDisponibles': {
          '$elemMatch': {
            'fechaInicio': {
              '$lte': new Date(params.fechaInicio ? params.fechaInicio : 0)
            },
            'fechaFinal': {
              '$gte': new Date(params.fechaFinal ? params.fechaFinal : 0)
            }
          }
        }
      }
    ]
  }

  Vivienda.find(query)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Viviendas using filter" });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Viviendas using filter" });
    });

}

exports.addRating = (req, res) => {
  const id = req.params.id;
  const user = req.query.usuario;
  const valoracion = req.query.valoracion;

  Vivienda.findById(id)
    .then(data => {
      if (data) {

        if (data.valoraciones.filter((rate) => rate._id == user).length > 0) {
          data.valoraciones.filter((rate) => rate._id == user)[0].valoracion = valoracion;
        } else {
          data.valoraciones.push({
            valoracion: valoracion,
            _id: user
          })
        }

        Vivienda.findByIdAndUpdate(id, data)
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot rate Vivienda with id ${id}. Maybe Vivienda was not found!`
              });
            } else res.status(200).send({ message: "Vivienda was rated successfully." });
          })
          .catch(err => {
            res.status(500).send({
              message: "Error rating Vivienda with id " + id
            });
          });

      } else {
        res.status(404).send({ message: "Not found Vivienda with id " + id });
      }

    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Vivienda with id " + id });
    });
}

exports.getRating = (req, res) => {
  const id = req.params.id;
  const user = req.query.usuario;

  Vivienda.findById(id)
    .then(data => {
      if (data) {

        rate = data.valoraciones.filter((rate) => rate._id == user);

        if (rate.length > 0) {
          res.status(200).send({ rating: rate[0].valoracion });
        } else {
          res.status(200).send({ rating: 0 });
        }

      } else {
        res.status(404).send({ message: "Not found Vivienda with id " + id });
      }

    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Vivienda with id " + id });
    });
}

exports.updateRating = (req, res) => {
  const id = req.params.id;

  Vivienda.findById(id)
    .then(data => {
      if (data) {

        let newRating = 0;

        if (data.valoraciones.length > 0) {
          let rates = data.valoraciones.map((rate) => rate.valoracion);
          newRating = (rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(1);
        }

        Vivienda.findByIdAndUpdate(id, { valoracion: newRating })
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update rating of Vivienda with id ${id}. Maybe Vivienda was not found!`
              });
            } else res.status(200).send({ message: "Vivienda was updated successfully with rating " + newRating});
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updated Vivienda with id " + id
            });
          });

      } else {
        res.status(404).send({ message: "Not found Vivienda with id " + id });
      }

    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Vivienda with id " + id });
    });
}