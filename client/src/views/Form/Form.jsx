import { useEffect, useState } from "react";
import validation from "./validation"

import { useDispatch, useSelector } from "react-redux";
import styles from './form.module.css';
import { getPlatforms, postGame, allGenres } from "../../redux/actions/actions";
import Loader from "../../components/Loader/Loader";


const Form = () => {
  //const allVideogames = useSelector((state) => state.videogames)
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    const plataforma= useSelector(state => state.platforms);
    //const history = useNavigate()
    useEffect(() => {
        dispatch(allGenres())
        dispatch(getPlatforms())
    },[dispatch]);
  //   function validation(input){
      
  //     let error={};
  //     if (!input.name) {
  //         error.name = "Name is required";
          
  //       } else if (input.name.length > 50) {
  //         error.name = "Name is too long";
  //       } else if (allVideogames.find(e => e.name.toLowerCase() === input.name.toLowerCase()) ){
  //         error.name = `The name ${input.name} is allready exist`
  //       }
  //      if (!input.description){
  //         error.description = "Description is required";
  //     } else if (input.description.length > 1000) {
  //         error.description = "Description is too long. (Max = 1000 characters)";
  //       }

  //     if (!input.released){
  //         error.released = "Date is required";
  //     }
  //     if (!input.rating) {
  //       error.rating = "Rate the game.";
  //   }
      
  //     else if (input.rating > 5 || input.rating < 0) {
  //         error.rating = "Rating must range between 0 to 5";
  //       }
  //     if (!input.img) {
  //         error.img = "Image URL is required";
  //       }
  //     if (input.platforms.length === 0) {
  //         error.platforms = "Minimun one Platform is required";
  //       }
       

  //     return error
  // }
    const [newGame, setNewGame] = useState({
        name: "",
        description: "",
        platforms: [],
        releaseDate: "",
        rating: 0,
        image: "",
        genres: []
    });

    const [error, setError] = useState({
        name: "",
        description: "",
        platforms: [],
        releaseDate: "",
        rating: 0,
        image: "",
        genres: []
    });

    const handleChange = (event) => {
      if (event.target.name === "platforms") {
          let newPlatforms = (event.target.value).split(" ");
          setNewGame({...newGame, platforms: newPlatforms});
      } else if (event.target.name === "rating") {
          setNewGame({...newGame, rating: (Number(event.target.value))/20});
      } else {
          setNewGame({...newGame, [event.target.name]: event.target.value});
      };
      setError(validation({...newGame, [event.target.name]: event.target.value}));
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    // Realiza la validación del formulario
    const formErrors = validation(newGame);

    // Verifica si hay errores en la validación
    if (Object.keys(formErrors).length === 0) {
        // No hay errores de validación, puedes enviar el formulario
        dispatch(postGame(newGame));
        setNewGame({
            name: "",
            description: "",
            platforms: [],
            releaseDate: "",
            rating: 0,
            image: "",
            genres: []
        });
        alert("Videogame created successfully");
    } else {
        // Hay errores de validación, muestra los mensajes de error
        setError(formErrors);
        alert("There are validation errors. Please correct them.");
    }
};

    function handleSelectGenres(e) {
        if (!newGame.genres.includes(e.target.value)) {
          setNewGame({
            ...newGame,
            genres: [...newGame.genres, e.target.value],
          });
          setError(
            validation({
              ...newGame,
              genres: [...newGame.genres, e.target.value],
            })
          );
        } else {
        setNewGame({
            ...newGame,
          });
        }
      };

      function handleSelectPlatforms(e) {
        if (!newGame.platforms.includes(e.target.value)) {
          setNewGame({
            ...newGame,
            platforms: [...newGame.platforms, e.target.value],
          });
          setError(
            validation({
              ...newGame,
              platforms: [...newGame.platforms, e.target.value],
            })
          );
        } else {
          setNewGame({
            ...newGame,
          });
        }
      };
      function handleDeletePlatforms(e){
        setNewGame({
            ...newGame,
            platforms: newGame.platforms.filter(el => el !==e )
        })
    }
    
    function handleDeleteGenres(e){
        setNewGame({
            ...newGame,
            genres: newGame.genres.filter(el => el !==e )
        })
    } 
    // Loading
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => setLoading(true)
    },[])

    if (loading) return (<div><Loader /></div>)
    
    return(
        <div className={styles.divForm}>
        
        <div className={styles.formBox}>
            <div className={styles.bg}></div>
            <h2 className={styles.h2Form}>Create Videogame</h2>
            <form className={styles.formDetail} onSubmit={handleSubmit}>
                <div className={styles.divName}>
                    <label htmlFor="name">Name: </label>
                    <br />
                    <input 
                        type="text"
                        name="name"
                        value={newGame.name}
                        onChange={handleChange}
                    />
                    <br/>
                    {
                        error.name ? (<span className={styles.errorSpan}>{error.name}</span>) : ("")
                    }
                </div>
   
               
                <div className={styles.divRating}> 
                    <label htmlFor="rating">Rating: </label>
                    <br />
                    <input 
                        type="range"
                        min="0"
                        max="100"
                        name="rating"
                        onChange={handleChange}
                    />
                    <br />
                    <span className={styles.errorSpan}>{(newGame.rating)}</span>
                    <br/>
                    {
                        error.rating ? (<span className={styles.errorSpan}>{error.rating}</span>) : ("")
                    }
                </div>
                <div className={styles.divDescription}>
                    <label htmlFor="description">Description: </label>
                    <br />
                    <textarea 
                        name="description" 
                        value={newGame.description}
                        onChange={handleChange}
                    ></textarea>
                    <br/>
                    {
                        error.description ? (<span className={styles.errorSpan}>{error.description}</span>) : ("")
                    }
                </div>
                <div className={styles.label}>
                    <label htmlFor="releaseDate">Release Date: </label>
                    <br />
                    <input 
                        type="date"
                        min="1980-01-01"
                        name="releaseDate"
                        value={newGame.releaseDate}
                        onChange={handleChange}
                    />
                    <br/>
                    {
                        error.releaseDate ? (<span className={styles.errorSpan}>{error.releaseDate}</span>) : ("")
                    }
                </div>
                <div className={styles.divImage}>
                    <label htmlFor="image">Image (URL): </label>
                    <br />
                    <input 
                        type="url"
                        name="image"
                        value={newGame.image}
                        onChange={handleChange}
                    />
                    <br/>
                    {
                        error.image ? (<span className={styles.errorSpan}>{error.image}</span>) : ("")
                    }
                </div>
              
                 <div className={styles.select}> 
             <div>
            <p className={styles.label}>Genres</p>
            <select  className={styles.thisInput} onChange={(e) => handleSelectGenres(e)}>
              <option value="all">All</option>
              {genres?.map((e) => {
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
    
          </div>
          <ul >
              {newGame.genres.map((e) => (
                <li key={e} className={styles.lista}>
                  <div >
                    {e + " "}
                    <button className={styles.buttonX} type='button' onClick={() => handleDeleteGenres(e)}>
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>

          
          <div>
            <p className={styles.label}>Platforms</p>
            <select  className={styles.thisInput} onChange={(e) => handleSelectPlatforms(e)}>
              <option value="all">All</option>
              {plataforma?.map((e) => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
            {error.platforms && <p className={styles.error}>{error.platforms}</p>} 
          </div>
          <ul >
              {newGame.platforms.map((e) => (
                <li key={e} className={styles.lista}>
                  <div >
                    {e + " "}
                    <button className={styles.buttonX} type='button' onClick={() => handleDeletePlatforms(e)}>
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            
             </div>
                <button className={styles.buttonCreate} onClick={handleSubmit} type="submit"><span>Create</span></button>
            </form>
        </div>
    </div>
)
}

export default Form;