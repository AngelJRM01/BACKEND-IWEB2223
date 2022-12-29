const express = require( 'express' );
const comentario = require('../controllers/comentario.controller.js');
const router = express.Router();

router.post('/', comentario.create);

router.get('/', comentario.findAll);

router.get('/:id', comentario.findOne);

router.put('/:id', comentario.update);

router.delete('/:id', comentario.delete);

router.get('/vivienda/:vivienda', comentario.findByVivienda);


module.exports = router;