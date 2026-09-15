const express = require('express');
//Objeto que nos permite crear rutas y manejar solicitudes HTTP
const router = express.Router();

// Ruta para obtener todas las incidencias

const{
    crearIncidencias, 
    obtenerIncidencias,
    filtrarIncidencias,
    buscarIncidenciasId,
    clasificarIncidencia
} = require('../controllers/incidenciasController');

router.get('/', obtenerIncidencias);
router.get('/filtrar', filtrarIncidencias);
router.get('/:id', buscarIncidenciasId);
router.get('/:id/clasificacion', clasificarIncidencia);
router.post('/', crearIncidencias);

module.exports = router;