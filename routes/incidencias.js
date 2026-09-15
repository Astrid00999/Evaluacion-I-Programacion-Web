const express = require('express');
//Objeto que nos permite crear rutas y manejar solicitudes HTTP
const router = express.Router();

// Ruta para obtener todas las incidencias

const{
    crearIncidencias, 
    obtenerIncidencias,
    filtrarIncidencias
} = require('../controllers/incidenciasController');

router.get('/:id', obtenerIncidencias);
router.post('/', crearIncidencias);
router.get('/filtrar', filtrarIncidencias);

module.exports = router;