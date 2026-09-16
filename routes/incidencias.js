const express = require('express');
//Objeto que nos permite crear rutas y manejar solicitudes HTTP
const router = express.Router();

// Ruta para obtener todas las incidencias

const {
    crearIncidencias,
    obtenerIncidencias,
    buscarIncidenciasId,
    cambiarEstado,
    eliminarIncidencia,
    clasificarIncidencia
} = require('../controllers/incidenciasController');

router.get('/', obtenerIncidencias);
router.get('/:id', buscarIncidenciasId);
router.get('/:id/clasificacion', clasificarIncidencia);
router.post('/', crearIncidencias);
router.put('/:id/estado', cambiarEstado);
router.delete('/:id', eliminarIncidencia);

module.exports = router;