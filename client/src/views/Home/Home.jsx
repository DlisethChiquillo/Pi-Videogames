import styles from './home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import { allGames, filterGames, orderGames, setPage, wordName } from '../../redux/actions/actions';
import SearchBar from '../../components/SearchBar/SearchaBar';
import Paginated from '../../components/Paginated/Paginated';
import { useEffect, useState } from 'react';
import imgMario from '../../media/pictures/loading2.gif'


const Home = () => {
    const videogames = useSelector(state => state.videogames);
    const currentPage = useSelector(state => state.currentPage);
    const genres = useSelector(state => state.genres);
    const dispatch = useDispatch();
    const [onGames, setOnGames] = useState(false);

    const onSearch = async(word) => {
        if (word) {
            dispatch(wordName(word));
        } else {
            dispatch(allGames());
        };
        dispatch(setPage(0));
    };

    // Loading
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 100)
        dispatch(allGames())
        .then(response => {
            if (response) {
                setOnGames(true);
            }
        });

        return () => setLoading(true);
    },[dispatch]);

    if (loading) {
        return(<div></div>);
    };

    // Paginated
    const gamesPerPage = 15;
    const totalPages = Math.ceil(videogames.length / gamesPerPage);
    const onPageChange = (pageNumber) => {
        dispatch(setPage(pageNumber));
    };
    const startIndex = currentPage * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const visibleGames = videogames.slice(startIndex, endIndex);
    
    //Orders and Filters
    const handlerOrder = (event) => {
        dispatch(orderGames(event.target.value));
    };
    const handleFilter = (event) => {
        if (event.target.value === 'DataBase') {
            dispatch(setPage(0));
        }
        dispatch(filterGames(event.target.value));

    };
    
    return(
        <div className={styles.homeContainer}>
        <div className={styles.divBackground}>
     
        </div>
        <div className={styles.divHome}>
            <div className={styles.divSearchBar}>
                <SearchBar onSearch={onSearch}/>
            </div>
            <div className={styles.divSelect}>
                <div>
                    <h3>Order</h3>
                    <select className={styles.select} onChange={handlerOrder}>
                        <option value="Default">Default</option>
                        <option value="Ascendant">Ascending Alphabetically</option>
                        <option value="Descendant">Decending Alphabetically</option>
                        <option value="RatingUp">Rating Up</option>
                        <option value="RatingDown">Rating Down</option>
                    </select>
                </div>
                <div>
                    <h3>Filters</h3>
                    <select className={styles.select} onChange={handleFilter}>
                        {
                            genres && genres.map((gen) =>{
                                return <option key={gen.id} value={gen.name}>{gen.name}</option>
                            })
                        }
                    </select>
                    <select className={styles.select} onChange={handleFilter}>
                        <option value="All">All Games</option>
                        <option value="DataBase">DataBase</option>
                        <option value="API">API</option>
                    </select>
                </div>
            </div>
            { onGames === false ? 
                <div className={styles.divGameLoader}>
                    <img src={imgMario} alt="Mario" />
                    <h3>Loading...</h3>
                </div> : 
                <ul className={styles.ulCards}>{ visibleGames.length > 0 ?
                    visibleGames.map((title, index) => {
                        return <Card
                        key={index}
                        data={title}
                        />
                    }): 
                    <div>
                        <h3>GAMES NOT FOUND!</h3>
                    </div>
                }</ul> 
            }
        </div>
        <Paginated
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange ={onPageChange}
        />
    </div>
)
}
export default Home;