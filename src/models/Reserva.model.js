const {Schema, model, SchemaTypes} = require('mongoose');

const Estancia = new Schema({
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFinal: {
        type: Date,
        required: true
    }
});

const Propietario = new Schema({
    nombre: {
        type: String,
        maxLength: 50,
        required: true
    },
    descripcion: {
        type: String,
        default: "Sin descripción.",
        maxLength: 300,
        required: true
    },
    foto: {
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png",
        required: true
    }
});

const Vivienda = new Schema({
    titulo: {
        type: String,
        maxLength: 50,
        required: true
    },
    direccion: {
        type: String,
        maxLength: 50,
        required: true
    },
    imagenes: {
        type: [String],
        validate: {
            validator: v => v.length >= 1
        },
        required: true
    }
});

const ReservaSchema = new Schema({
    fecha: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
        required: true
    },
    estancia: {
        type: Estancia,
        required: true
    },
    propietario: {
        type: Propietario,
        required: true
    },
    huesped: {
        type: SchemaTypes.ObjectId,
        required: true
    },
    ocupantes: {
        type: Number,
        min: 1,
        required: true
    },
    vivienda: {
        type: Vivienda,
        required: true
    },
    precio: {
        type: Number,
        min: 0,
        required: true
    }
});

module.exports = model('Reserva', ReservaSchema);