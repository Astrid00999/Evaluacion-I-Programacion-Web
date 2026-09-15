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

const cambiarEstado = (req, res) => {
    id = parseInt(req.params.id);
    const { estado } = req.body;

    const incidencia = incidenciasD.find(i => i.id === id);
    if (!incidencia) {
        return res.status(404).json({ error: 'Incidencia no encontrada' });
    }

    switch (estado) {
        case 'Pendiente':
        case 'En Proceso':
        case 'Resuelta':
        case 'Cancelada':
            incidencia.estado = estado;
            res.status(200).json({ message: 'Estado de la incidencia actualizado', incidencia });
            break;
        default:
            return res.status(400).json({ error: 'Estado inválido. Debe ser Pendiente, En Proceso, Resuelta o Cancelada' });

    }

};

const eliminarIncidencia = (req, res) => {
    const id = parseInt(req.params.id);
    const index = incidenciasD.findIndex(i => i.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Incidencia no encontrada' });
    }

    incidenciasD.splice(index, 1);
    return res.status(200).json({ mensaje: 'Incidencia eliminada correctamente' });
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
    filtrarIncidencias,
    cambiarEstado,
    eliminarIncidencia
};