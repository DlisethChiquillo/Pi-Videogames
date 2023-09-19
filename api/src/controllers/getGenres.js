const axios = require('axios');
const {API_KEY} = process.env
const {Genres} = require('../db');

let dataLoad = false//si generos ya han sido cargados en la base de datos local. Inicialmente, se establece en false.


const getGenres = async(req, res) => {
    try{
        if(!dataLoad){
            const results = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;
            dataBase = await Genres.bulkCreate(results);
            dataLoad= true;
        }
        return res.status(200).json(dataBase);
    } catch(error){
        return res.status(500).json({error: error.message})
    }
}


module.exports = getGenres;




