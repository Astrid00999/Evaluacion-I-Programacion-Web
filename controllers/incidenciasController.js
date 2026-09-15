const paquete = require('../data/paquetes.js');

const crearIncidencias = (req, res) => {
    // Lógica para crear un nuevo paquete

    const { empleado, area, descripcion, prioridad } = req.body;
    const estado = "pendiente"; 

    if (!empleado || !area || !descripcion || !prioridad) {
        {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    }
    else if (empleado === null || area === null || descripcion === null || prioridad === null) {
        return res.status(400).json({ error: 'Los campos no pueden tener datos vacíos' });
    }

    switch (prioridad) {
        case 'alta':
            break;
        case 'media':
            break;
        case 'baja':
            break;
        default:
            return res.status(400).json({ error: 'La prioridad debe ser alta, media o baja' });
    }

};

const obtenerIncidencias = (req, res) => {
    // Lógica para obtener todos los paquetes
};

const filtrarIncidencias = (req, res) => {
    // Lógica para filtrar paquetes
};

module.exports = {
    crearIncidencias,
    obtenerIncidencias,
    filtrarIncidencias
};