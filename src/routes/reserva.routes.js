const express = require( 'express' );
const reservas = require('../controllers/reserva.controller.js');
const router = express.Router();
const { validateAccessToken } = require("../middleware/auth0.js");

// Create a new reserva
router.post('/', validateAccessToken, reservas.create);

//Retrieve all reservas
router.get('/', validateAccessToken, reservas.findAll);

// Retrieve a single reserva with id
router.get('/:id', validateAccessToken, reservas.findOne);

//Retrieve all reservas with antique
router.get('/antiguedad/:fecha', validateAccessToken, reservas.findByAntique);

// Update a reserva with id
router.put('/:id', validateAccessToken, reservas.update);

// Delete a reserva with id
router.delete('/:id', validateAccessToken, reservas.delete);

// Retrieve all reservas after a date. Angel FC
router.get('/estancia/:fechaInicio', validateAccessToken, reservas.findByFutureDate);

// Retrieve vivienda from a reserva
router.get('/:id/vivienda', validateAccessToken, reservas.findVivienda);

// Retrieve all reservas of a person
router.get('/usuario/:id', validateAccessToken, reservas.findByPerson);

module.exports = router;