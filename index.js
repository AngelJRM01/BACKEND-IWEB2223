require('./src/database');

const express = require("express");
const app = express();

const formidableMiddleware = require('express-formidable');

const reservaRoutes = require('./src/routes/reserva.routes');
const viviendaRoutes = require('./src/routes/vivienda.routes');
const imagesRoutes = require('./src/routes/images.routes');
const { errorHandler } = require("./src/middleware/error");
const { notFoundHandler } = require("./src/middleware/not-found");
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/reservas', reservaRoutes);
app.use('/viviendas', viviendaRoutes);
app.use('/images', [formidableMiddleware()], imagesRoutes);

app.use(errorHandler);
app.use(notFoundHandler);

app.set('port', process.env.port || 4000);

app.listen(app.get('port'), () => {
    console.log('Server on port 4000');    
})