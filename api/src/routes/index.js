const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllVideogames = require('../controllers/getAllVideogames');
const getVideogame = require('../controllers/getVideogame');
const createVideogame = require('../controllers/createVideogame');
const getGenres = require('../controllers/getGenres');
const getPlatforms = require('../controllers/getPlatforms')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogame', getAllVideogames);
router.get('/genre', getGenres);
router.get('/platforms', getPlatforms);
router.get('/detail/:id', getVideogame);
router.post('/create', createVideogame);

module.exports = router;