const { Videogame, Genres } = require('../db');

const createVideogame = async (req, res) => {
  const { name, description, platforms, image, releaseDate, rating, genres } = req.body;

  try {
    if (!name || !platforms || !image || !releaseDate || !rating || genres.length === 0) {
      return res.status(400).json({ error: 'Missing or invalid data.' });
    }

    const newVideogame = await Videogame.create({
      name,
      description: `<p>${description}</p>` || '<p>Description not available.</p>',
      platforms,
      image,
      releaseDate,
      rating,
      
    });

    for (const genre of genres) {
      const genreName = await Genres.findOne({ where: { name: genre } });
      if (genreName) {
        await newVideogame.addGenres(genreName);
      }
    }

    res.status(201).json({ videogame: newVideogame });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
};

module.exports = createVideogame;


//const createVideogameHandler = async (req, res) => {
//   try{
//     const { name, description, platforms, image, releaseDate, rating, genres } = req.body;
//     const vgCreated = await createVideogame(name, description, platforms, image, releaseDate, rating, genres);
//     return res.status(200).send(vgCreated);
// }catch (error){
//     res.status(400).json({error: error.message});
// }
// };

