const express = require('express');
const viviendas = require('../controllers/vivienda.controller.js');
const router = express.Router();

// Create a new vivienda
router.post('/', viviendas.create);

//Retrieve all viviendas
router.get('/', viviendas.findAll);

// Retrieve viviendas by filter
router.get('/filtro', viviendas.findByFiltro)

// Retrieve all propietarios
router.get('/propietarios', viviendas.findOwners);

// Retrieve a single vivienda with id
router.get('/:id', viviendas.findOne);

// Update a vivienda with id
router.put('/:id', viviendas.update);

// Delete a vivienda with id
router.delete('/:id', viviendas.delete);

// Retrieve all reservas from a vivienda
router.get('/:id/reservas', viviendas.findReservas);

// Retrieve all guests from a vivienda
router.get('/:id/huespedes', viviendas.findGuests);

// Retrieve all guests from a owner
router.get('/propietarioHuespedes/:id', viviendas.findGuestsOfOwner);

// Retrieve all viviendas from a owner
router.get('/propietario/:id', viviendas.findViviendasOfOwner);


module.exports = router;