import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import styles from './detail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDetail, getDetail } from '../../redux/actions/actions';
import Loader from "../../components/Loader/Loader";
//import BackgroundVideo from "../../components/BackgroundVideo/BackgroundVideo";
//const BACKGROUND_TYPE = 'swap'; 

const Detail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const detailedGame = useSelector(state => state.detailedGame);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const parser = new DOMParser();

    useEffect(()=>{
        dispatch(getDetail(id)).then((result) => {
            if (result.error) {
                alert('Game not found')
                navigate('*')
            }
        })
        return () => dispatch(deleteDetail());
    },[id, dispatch, navigate]);  

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
        return () => setLoading(true);
    },[]);

    if (loading) {
        return(<div><Loader/></div>);
    };

    const doc = parser.parseFromString(detailedGame.description, 'text/html');
    const paragraphs = doc.querySelectorAll('p');
    const parsedContent = [];
    paragraphs.forEach(paragraph => {
        parsedContent.push(paragraph.textContent);
    });

    return( 
        <div className={styles.divDetail}>
        {/* <BackgroundVideo videoType={BACKGROUND_TYPE}/> */}
        <div className={styles.infoBorder}>
            <div className={styles.bg}></div>
            <h2 className={styles.h2Name}>{detailedGame.name}</h2>
            <div className={styles.divInfo}>
                <div className={styles.divImg}>
                    <img className={styles.imgDetail} src={detailedGame.image} alt={detailedGame.name} />
                </div>
                <div className={styles.divDescription}>
                    <p>{parsedContent}</p>
                </div>
                <div className={styles.divPlatGenres}>
                    <div className={styles.platforms}>
                        <h4>Platforms: </h4>
                        {detailedGame.platforms?.map((plat, index) => {
                            return <p className={styles.lpInfo} key={index}>{plat}</p>
                        })}
                    </div>
                    <div className={styles.genres}>
                        <h4>Release Date: </h4><p className={styles.pInfo}>📅 {detailedGame.releaseDate}</p>
                        <h4>Rating: </h4><p className={styles.pInfo}>{detailedGame.rating} {"\u2B50"}</p>
                        <h4>Genres: </h4>
                        {detailedGame.genres?.map((gen, index) => {
                            return <p className={styles.lpInfo} key={index}>{gen}</p>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default Detail;