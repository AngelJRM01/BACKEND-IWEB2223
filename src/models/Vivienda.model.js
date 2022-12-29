const { Schema, model } = require('mongoose');

const FechasNoDisponibles = {
    fechaInicio: Date,
    fechaFinal: Date
}

const Propietario = {
    id: String,
    nombre: String,
    foto: String
}

const Coordenadas = {
    latitud: Number,
    longitud: Number
}

const Valoracion = {
    usuario: String,
    valoracion: {
        type: Number,
        max: 5,
        min: 0
    }
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
    estado: {
        type: String,
        required: true
    },
    fechasNoDisponibles: {
        type: [FechasNoDisponibles],
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
    },
    valoraciones: {
        type: [Valoracion],
        required: true
    }
})

module.exports = model('Vivienda', ViviendaSchema);