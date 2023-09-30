// const axios = require('axios');
// const {API_KEY} = process.env
// const {Genres} = require('../db');

// let dataLoad = false//si generos ya han sido cargados en la base de datos local. Inicialmente, se establece en false.


// const getGenres = async(req, res) => {

    
// try {

//     if(!dataLoad){
// const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
// const genresData = response.data.results
// dataLoad= true;
    



//     const genres = await Genres.findAll({
//       attributes: ['name'], // Selecciona solo el campo 'name'
//     });
//     const genreNames = genres.map(genre => genre.name);
//     res.status(200).json(genreNames);
//   } 
 
// catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener los géneros desde la base de datos' });
//   }
// }

// }
//2
// const axios = require('axios');
// const {API_KEY} = process.env
// const {Genres} = require('../db');

// let dataLoad = false//si generos ya han sido cargados en la base de datos local. Inicialmente, se establece en false.


// const getGenres = async(req, res) => {

    
// try {

//     if(!dataLoad){
// const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
// const genresData = response.data.results
// dataLoad= true;
    



//     const genres = await Genres.findAll({
//       attributes: ['name'], // Selecciona solo el campo 'name'
//     });
//     const genreNames = genres.map(genre => genre.name);
//     res.status(200).json(genreNames);
//   } 
// }
// catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener los géneros desde la base de datos' });
//   }
// }

const axios = require('axios');
const { API_KEY } = process.env;
const { Genres } = require('../db');
let dataLoad = false;
const getGenres = async (req, res) => {
  try {
    if (!dataLoad) {
      const results = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;

      // Utiliza bulkCreate con updateOnDuplicate para actualizar en caso de duplicados
      await Genres.bulkCreate(results, {
        updateOnDuplicate: ['name'], // Suponiendo que 'name' es el campo único
      });

      dataLoad = true;
    }

    const genres = await Genres.findAll();
    return res.status(200).json(genres);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getGenres;

// const getGenres = async(req, res) => {
//     try {
//         if (!dataLoad) {
//             const results = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;
//             dataBase = await Genres.bulkCreate(results);
//             dataLoad = true;
//         }
//         return res.status(200).json(dataBase);
//     } catch (error) {
//         return res.status(500).json({error: error.message})
//     }
// }

// module.exports = getGenres;



















// const { Genres} = require("../db");
// const axios = require("axios");
// require('dotenv').config();
// const { API_KEY } = process.env;

// let genresAreLoaded = false;// Para controlar si generos ya fueron cargados 

// const getGenres = async (req, res) => {
//     let genresClean;
//     if (genresAreLoaded) {
//         const genresApi = await Genres.findAll();
//     genresClean = genresApi.map(genre => genre.name);

        
//     } else {// si genresAreLoaded false obtengo de API lista de generos 
//         const API_URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;
//         const apiData = await axios.get(API_URL);
//         const genresApi = apiData.data.results;
//         genresClean = genresApi.map((genre) => genre.name);
        
//         const promises = genresClean.map((genre) => {
//             return Genres.findOrCreate({
//                 where: { name: genre }
//             });
//         });
//         await Promise.all(promises);//asegura que todos los géneros se hayan buscado o creado en la base de datos antes de continuar.

//         genresAreLoaded = true; 
//     };
//      return res.status(200).json(genresClean);
// };

module.exports = getGenres;
