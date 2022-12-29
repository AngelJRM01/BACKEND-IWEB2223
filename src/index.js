require('./database');

const express = require("express");
const app = express();

const formidableMiddleware = require('express-formidable');

const reservaRoutes = require('./routes/reserva.routes');
const viviendaRoutes = require('./routes/vivienda.routes');
const imagesRoutes = require('./routes/images.routes');
const comentarioRoutes = require('./routes/comentario.routes');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/reservas', reservaRoutes);
app.use('/viviendas', viviendaRoutes);
app.use('/comentarios', comentarioRoutes);
app.use('/images', [formidableMiddleware()], imagesRoutes);


app.set('port', process.env.port || 4000);

app.listen(app.get('port'), () => {
    console.log('Server on port 4000');    
})