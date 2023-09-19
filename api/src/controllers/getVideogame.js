const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genres } = require('../db');
const URL = `https://api.rawg.io/api/games`;

const getVideogame = async(req, res) => {
    const {id} = req.params;
    let videogame = {};
    try {
        if (id.length > 7) {
            const gameDB = await Videogame.findByPk(id, {include: [Genres]});
            if(gameDB) { 
                const titleDB = {
                    id: gameDB.id,
                    name: gameDB.name,
                    description: gameDB.description,
                    platforms: gameDB.platforms,
                    image: gameDB.image,
                    releaseDate: gameDB.releaseDate,
                    rating: gameDB.rating,
                    genres: gameDB.genres.map(gen => gen.name)
                }
                videogame = titleDB; 
            }
        } else {
            const games = (await axios(`${URL}/${id}?key=${API_KEY}`)).data;
            if (games) {
                const game = {
                    id: games.id,
                    name: games.name,
                    description: games.description || 'Description not available.',
                    platforms: games.platforms.map(plat => plat.platform.name),
                    image: games.background_image,
                    releaseDate: games.released,
                    rating: games.rating,
                    genres: games.genres.map(gen => gen.name)
                }
                videogame = game;
            }
        }
        if (videogame) {
            res.status(200).json(videogame)
        } else {
            res.status(404).send('Game not found')
        }
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

module.exports = getVideogame;