const express = require( 'express' );
const reservas = require('../controllers/reserva.controller.js');
const router = express.Router();

// Create a new reserva
router.post('/', reservas.create);

//Retrieve all reservas
router.get('/', reservas.findAll);

// Retrieve a single reserva with id
router.get('/:id', reservas.findOne);

//Retrieve all reservas with antique
router.get('/antiguedad/:fecha', reservas.findByAntique);

// Update a reserva with id
router.put('/:id', reservas.update);

// Delete a reserva with id
router.delete('/:id', reservas.delete);

// Retrieve all reservas after a date. Angel FC
router.get('/estancia/:fechaInicio', reservas.findByFutureDate);

// Retrieve vivienda from a reserva
router.get('/:id/vivienda', reservas.findVivienda);

module.exports = router;