const {Schema, model} = require('mongoose');

const FechasDisponibles = {
    fechaInicio : Date,
    fechaFinal : Date
}

const Propietario = {
    id : String,
    nombre : String,
    foto : String
}

const Coordenadas = {
    latitud : Number,
    longitud : Number
}

const ViviendaSchema = new Schema({
    capacidad: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },    
    estado:{
        type: String,
        required: true
    },
    fechasDisponibles: {
        type: [FechasDisponibles],
        required: true
    },
    imagenes: {
        type: [String],
        required: true
    },
    precioNoche: {
        type: Number,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    valoracion: {
        type: Number,
        required: true
    },
    propietario: {
        type: Propietario,
        required: true
    },
    coordenadas: {
        type: Coordenadas,
        required: true
    }
})

module.exports = model('Vivienda', ViviendaSchema);