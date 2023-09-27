import styles from './backgroundVideo.module.css'
import Mario1 from '../../media/video/Mario1.mp4'


import { useEffect, useState } from 'react'

const BackgroundVideo = ({videoType}) => {
    const [video, setVideo] = useState(null);
    // const random = [];
    // const indexRandom = Math.floor(Math.random()*random.length);
    
    useEffect(() => {
        
   
        if (videoType === 'Mario1') setVideo(Mario1);
    
    //     else if (videoType === 'swap') setVideo(random[indexRandom])
    // },[videoType, indexRandom]);
    })
    return(
        <div  className={styles.videoContainer}>
            <video  className={styles.videoBackground} loop autoPlay muted>
                <source src={video}/>
            </video>
        </div>
    )
}

export default BackgroundVideo;


//En resumen, este componente React llamado BackgroundVideo toma una prop llamada videoType, selecciona un video para reproducir según el valor de videoType, y muestra ese video en un elemento de video HTML dentro de un contenedor. Las clases CSS se aplican para estilizar el componente.
//const BackgroundVideo = ({videoType}) => {: Declara un componente de React llamado BackgroundVideo que acepta una prop llamada videoType. Este componente es una función que recibe las propiedades del componente principal que lo utiliza.

// const [video, setVideo] = useState(null);: Declara una variable de estado llamada video utilizando el hook useState. Inicialmente, se establece en null. La función setVideo se utilizará para actualizar el valor de video más adelante.

// useEffect(() => {: Comienza un efecto secundario utilizando el hook useEffect. Este efecto se ejecutará cuando el componente se monte y siempre que videoType cambie.

// if (videoType === 'City') setVideo(On_the_City);: Si la prop videoType es igual a 'City', se asigna el valor de On_the_City a la variable de estado video utilizando la función setVideo.

// else if (videoType === 'Mario1') setVideo(Beach_Night);: Si la prop videoType no es igual a 'City' pero es igual a 'Beach_Night', se asigna el valor de Beach_Night a la variable de estado video utilizando la función setVideo.

// return(: Comienza la declaración del contenido JSX del componente.