const incidenciasD = require('../data/incidenciasData.js');

const crearIncidencias = (req, res) => {
    // Lógica para crear una nueva incidencia

    const { empleado, area, descripcion, prioridad } = req.body;
    //Regla de negocio
    const estado = "Pendiente";

    if (!empleado || !area || !descripcion || !prioridad ||
        empleado.trim() === "" || area.trim() === "" ||
        descripcion.trim() === "" || prioridad.trim() === "") {
        return res.status(400).json({ error: 'Todos los campos son obligatorios y no pueden estar vacíos' });
    }

    switch (prioridad) {
        case 'Alta':
            break;
        case 'Media':
            break;
        case 'Baja':
            break;
        default:
            return res.status(400).json({ error: 'La prioridad debe ser alta, media o baja' });
    }

    const nuevaIncidencia = {
        id: incidenciasD.length > 0 ? Math.max(...incidenciasD.map(i => i.id)) + 1 : 1,
        empleado, area, descripcion, prioridad, estado
    };

    incidenciasD.push(nuevaIncidencia);
    res.status(201).json({ message: 'Incidencia creada exitosamente', incidencia: nuevaIncidencia });

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