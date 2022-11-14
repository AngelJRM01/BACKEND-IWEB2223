const {Schema, model} = require('mongoose');

const Estancia = {
    fechaInicio : Date,
    fechaFinal : Date
}

const Persona = {
    id: String,
    nombre : String,
    foto : String
}

const Vivienda = {
    id: String,
    titulo : String,
    direccion : String,
    imagenes : [String]
}

const ReservaSchema = new Schema({
    fecha: {
        type: Date,
        required: true
    },
    estancia: {
        type: Estancia,
        required: true
    },
    persona: {
        type: Persona,
        required: true
    },
    ocupantes: {
        type: Number,
        required: true
    },
    vivienda: {
        type: Vivienda,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

module.exports = model('Reserva', ReservaSchema);