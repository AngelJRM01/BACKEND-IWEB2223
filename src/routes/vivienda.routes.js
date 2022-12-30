const express = require('express');
const viviendas = require('../controllers/vivienda.controller.js');
const router = express.Router();
const { validateAccessToken } = require("../middleware/auth0.js");

// Create a new vivienda
router.post('/', validateAccessToken, viviendas.create);

//Retrieve all viviendas
router.get('/', viviendas.findAll);

// Retrieve viviendas by filter
router.get('/filtro', viviendas.findByFiltro)

// Retrieve all propietarios
router.get('/propietarios', viviendas.findOwners);

// Retrieve a single vivienda with id
router.get('/:id', viviendas.findOne);

// Update a vivienda with id
router.put('/:id', validateAccessToken, viviendas.update);

// Delete a vivienda with id
router.delete('/:id', validateAccessToken, viviendas.delete);

// Retrieve all reservas from a vivienda
router.get('/:id/reservas', viviendas.findReservas);

// Retrieve all guests from a vivienda
router.get('/:id/huespedes', viviendas.findGuests);

// Retrieve all guests from a owner
router.get('/propietarioHuespedes/:id', viviendas.findGuestsOfOwner);

// Retrieve all viviendas from a owner
router.get('/propietario/:id', validateAccessToken, viviendas.findViviendasOfOwner);

// Create new valoracion
router.put('/valoracion/:id', viviendas.addRating);

// Get user valoracion
router.get('/valoracion/:id', viviendas.getRating);

// Update rating
router.put('/actualizar/:id', viviendas.updateRating);

module.exports = router;