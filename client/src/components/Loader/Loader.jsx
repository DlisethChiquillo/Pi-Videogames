import styles from './loader.module.css';
import video from '../../media/video/31.mp4' 
import { useEffect, useRef } from 'react';

const Loader = () => {
    const videoRef = useRef(null);
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 2.0;
        }
    }, []);

    return(
        <div className={styles.divLoader} >
            <video ref={videoRef} autoPlay muted>
                <source src={video}/>
            </video>
        </div>
    )
}

export default Loader;