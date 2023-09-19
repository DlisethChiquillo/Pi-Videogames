import { NavLink } from 'react-router-dom';
import styles from './card.module.css';

const Card = ({ data }) =>{
    return(
        <div className={styles.divCard}>
            <NavLink className={styles.cardImg} to={`/detail/${data.id}`}>
                <p className={styles.name}>{data.name}</p>
                <img className={styles.img} src={data.image} alt={data.name}/>
                <p className={styles.rating}>Rating: {data.rating}{"\u2B50"}</p>
                <p className={styles.genres}>{data.genres.map(genre => `${genre} `)}</p>
            </NavLink>
        </div>
    )
}

export default Card;