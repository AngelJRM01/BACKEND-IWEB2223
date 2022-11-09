const {Schema, model} = require('mongoose');

const FechaEstancia = {
    fechaInicio : Date,
    fechaFinal : Date
}

const Vivienda = {
    nombre : String,
    fotoPrincipal : String
}

const Reserva = {
    nombreVivienda : String,
    fechaReserva : Date,
    fechaEstancia : FechaEstancia
}

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    viviendas: {
        type: [Vivienda],
        required: true
    },
    reservas: {
        type: [Reserva],
        required: true
    }
})

module.exports = model('Usuario', UsuarioSchema);