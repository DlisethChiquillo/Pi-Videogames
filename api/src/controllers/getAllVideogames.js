const axios = require('axios');
const { Videogame, Genres } = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env;

const getAllVideogames = async(req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const nameGames = [];
            const dbGames = await Videogame.findAll({
                where: { 
                    name: {
                        [Op.iLike]: '%' + name + '%'
                    }
                }, include: [Genres]
            });
            
            if (dbGames) {
                dbGames.map((dbGame) => {
                    let gameDB = {
                        id: dbGame.id,
                        name: dbGame.name,
                        description: dbGame.description,
                        platforms: dbGame.platforms,
                        image: dbGame.image,
                        releaseDate: dbGame.released,
                        rating: dbGame.rating,
                        genres: dbGame.genres.map(gen => gen.name)
                    }
                    nameGames.push(gameDB)
                })   
            }

            const nameGamesLength = nameGames.length
            const results = (await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=${15-nameGamesLength}`)).data.results;
            
            if (results) {
                results.map(async(game) => {
                    let title = {
                        id: game.id,
                        name: game.name,
                        description: game.description || 'Description not available.',
                        platforms: game.platforms?.map(plat => plat.platform.name),
                        image: game.background_image,
                        releaseDate: game.released,
                        rating: game.rating,
                        genres: game.genres.map(gen => gen.name)
                    }
                    nameGames.push(title)
                });
            }
            return res.status(201).json(nameGames);
        } else {
            const gamesResults = [];
            const dbGames = await Videogame.findAll({include: [Genres]})
            if (dbGames) {
                dbGames.map((game) => {
                    let gameDB = {
                        id: game.id,
                        name: game.name,
                        description: game.description,
                        platforms: game.platforms,
                        image: game.image,
                        releaseDate: game.releaseDate,
                        rating: game.rating,
                        genres: game.genres.map(gen => gen.name)
                    };
                    gamesResults.unshift(gameDB)
                })
            }
            const gamesAPI = `https://api.rawg.io/api/games?key=${API_KEY}`;
            for (let i = 0; i < 3; i++) {
                let results = (await axios(`${gamesAPI}&page=${i+1}&page_size=33`)).data.results;
                results.map((game) => {
                    let title = {
                        id: game.id,
                        name: game.name,
                        description: game.description || 'Description not available.',
                        platforms: game.platforms.map(plat => plat.platform.name),
                        image: game.background_image,
                        releaseDate: game.released,
                        rating: game.rating,
                        genres: game.genres.map(gen => gen.name)
                    }
                    gamesResults.push(title);
                });
            }
            return res.status(200).json(gamesResults);
        }
        
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

module.exports = getAllVideogames;