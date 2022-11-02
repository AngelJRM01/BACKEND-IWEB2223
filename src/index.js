require('./database');
const Downloader = require("nodejs-file-downloader");

const express = require("express");
const app = express();
const reservaRoutes = require('./routes/reserva.routes');
const viviendaRoutes = require('./routes/vivienda.routes');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/reservas', reservaRoutes);
app.use('/viviendas', viviendaRoutes);


app.set('port', process.env.port || 4000);

app.listen(app.get('port'), () => {
    console.log('Server on port 4000');    
})