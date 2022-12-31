const {Schema, model, SchemaTypes, trusted} = require('mongoose');


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
    valoracion: {
        type: Number,
        max: 5,
        min: 0
    }
}

const Respuesta = new Schema({
    fecha: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
        required: true
    },
    vivienda: {
        type: SchemaTypes.ObjectId,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    imagenUsuario: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        required: true
    },
    dislikes: {
        type: [String],
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
});

const Comentario = new Schema({
    fecha: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
        required: true
    },
    vivienda: {
        type: SchemaTypes.ObjectId,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    imagenUsuario: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        required: true
    },
    dislikes: {
        type: [String],
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    respuestas: {
        type: [Respuesta],
        required: true
    }
})

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
    },
    comentarios: {
        type: [Comentario],
        required: true
    }
})

module.exports = model('Vivienda', ViviendaSchema);