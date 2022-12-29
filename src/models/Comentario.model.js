const {Schema, model, SchemaTypes} = require('mongoose');

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

const ComentarioSchema = new Schema({
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
});

module.exports = model('Comentario', ComentarioSchema);