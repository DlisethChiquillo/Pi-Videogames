const axios = require('axios');
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games`;

const getPlatforms = async(req, res) => {
    try {
        const response = (await axios(`${URL}?key=${API_KEY}`)).data.results
        const platforms = new Set();
        if (response) {
            response.map((game) => {
                game.platforms.map((plat) => {
                    platforms.add(plat.platform.name)
                })
            })
        }
        const plataformas = [];
        platforms.forEach(function(plat) {
            plataformas.push(plat);
        })
        res.status(200).json(plataformas);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

module.exports = getPlatforms;