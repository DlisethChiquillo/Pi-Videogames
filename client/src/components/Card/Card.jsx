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

// En resumen, este componente React llamado Card representa un card de información que contiene el nombre, una imagen, la calificación y los géneros de un elemento de datos (data). Además, el card es un enlace (NavLink) que redirige a una página de detalles específica cuando se hace clic en él, utilizando el ID de data para construir la URL de destino. Los estilos CSS se aplican a los elementos del card para darle formato y estilo.