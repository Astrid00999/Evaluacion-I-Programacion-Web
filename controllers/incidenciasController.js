const incidenciasD = require('../data/incidenciasData.js');

//Contador para generar ids numericos consecutivos
let contadorId = 1;

const crearIncidencias = (req, res) => {

    const { empleado, area, descripcion, prioridad } = req.body;

    // Verifica que sea texto con contenido real: rechaza undefined, null, "" y "   "
    const esTextoValido = (valor) => typeof valor === 'string' && valor.trim() !== '';

    if (!esTextoValido(empleado) || !esTextoValido(area) || !esTextoValido(descripcion) || !esTextoValido(prioridad)) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    if(!/^[a-zA-ZÁÉÍÓÚÑáéíóúñÇç\s]+$/.test(empleado.trim())) {
        return res.status(400).json({ error: 'El nombre solo debe contener letras y espacios'})
    }

    // let porque el switch le asigna el valor ya normalizado
    let prioridadValidada = '';

    switch (prioridad.trim().toLowerCase()) {
        case 'alta':
            prioridadValidada = 'Alta';
            break;
        case 'media':
            prioridadValidada = 'Media';
            break;
        case 'baja':
            prioridadValidada = 'Baja';
            break;
        default:
            return res.status(400).json({ error: 'La prioridad debe ser Alta, Media o Baja' });
    }

    const nuevaIncidencia = {
        id: contadorId,
        empleado: empleado.trim(),
        area: area.trim(),
        descripcion: descripcion.trim(),
        prioridad: prioridadValidada,
        estado: 'Pendiente'
    };

    incidenciasD.push(nuevaIncidencia);
    contadorId++;

    res.status(201).json({ mensaje: 'Incidencia registrada correctamente' , incidenciaAgregada: nuevaIncidencia });
};

const cambiarEstado = (req, res) => {
    const id = Number(req.params.id);
    const { estado } = req.body;

    if(!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'El id debe ser un número positivo'})
    }
    if (typeof estado !== 'string' || estado.trim() === '') {
        return res.status(400).json({ error: 'El estado es obligatorio y debe ser un texto válido' });
    }

    const incidencia = incidenciasD.find(i => i.id === id);

    if (!incidencia) {
        return res.status(404).json({ error: 'Incidencia no encontrada' });
    }

    let estadoValidado = '';
    
    switch (estado.trim().toLowerCase()) {
        case 'pendiente': 
            estadoValidado = 'Pendiente'; 
            break;
        case 'en proceso':
            estadoValidado = 'En Proceso'; 
            break;
        case 'resuelta': 
            estadoValidado = 'Resuelta'; 
            break;
        case 'cancelada': 
            estadoValidado = 'Cancelada'; 
            break;
        default:
            return res.status(400).json({ error: 'Estado inválido. Debe ser Pendiente, En Proceso, Resuelta o Cancelada' });
    }

    incidencia.estado = estadoValidado;

    return res.status(200).json({ mensaje: 'Estado de la incidencia actualizado correctamente' , incidenciaActualizada: incidencia });

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

const buscarIncidenciasId = (req, res) => {

    const id = parseInt(req.params.id);
    const incidencia = incidenciasD.find(incidencia => incidencia.id === id);

    if (!incidencia) {
        return res.status(404).json({ error: 'Incidencia no encontrada' })
    }

    res.json(incidencia);
};

// 7. Endpoint de Estadísticas -> GET /estadisticas


// Cuenta cuántas incidencias tienen un estado determinado.
// filter() + length evita crear contadores manuales (restricción del enunciado).
const contarPorEstado = (lista, estado) => {
    return lista.filter(incidencia => incidencia.estado.trim().toLowerCase() === estado).length;
};

const obtenerEstadisticas = (req, res) => {
    const estadisticas = {
        totalIncidencias: incidenciasD.length,
        pendientes: contarPorEstado(incidenciasD, 'pendiente'),
        enProceso: contarPorEstado(incidenciasD, 'en proceso'),
        resueltas: contarPorEstado(incidenciasD, 'resuelta'),
        canceladas: contarPorEstado(incidenciasD, 'cancelada')
    };

    res.json(estadisticas);
};


// 8. Clasificación Automática -> GET /incidencias/:id/clasificacion


const clasificarIncidencia = (req, res) => {
    const id = parseInt(req.params.id);
    const incidencia = incidenciasD.find(incidencia => incidencia.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }

    let clasificacion = '';

    switch (incidencia.prioridad.trim().toLowerCase()) {
        case 'alta':
            clasificacion = 'Crítica';
            break;
        case 'media':
            clasificacion = 'Importante';
            break;
        case 'baja':
            clasificacion = 'Normal';
            break;
        default:
            clasificacion = 'Sin clasificar';
            break;
    }

    res.json({
        id: incidencia.id,
        clasificacion: clasificacion
    });
};



module.exports = {
    crearIncidencias,
    obtenerIncidencias,
    filtrarIncidencias,
    cambiarEstado,
    eliminarIncidencia,
    buscarIncidenciasId,
    obtenerEstadisticas,
    clasificarIncidencia
};