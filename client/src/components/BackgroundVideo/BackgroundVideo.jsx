import styles from './backgroundVideo.module.css'
import On_the_City from '../../media/video/On_the_City.mp4';
import Beach_Night from '../../media/video/Beach_Night.mp4'


import { useEffect, useState } from 'react'

const BackgroundVideo = ({videoType}) => {
    const [video, setVideo] = useState(null);
    // const random = [];
    // const indexRandom = Math.floor(Math.random()*random.length);
    
    useEffect(() => {
        
     if (videoType === 'City') setVideo(On_the_City);
            else if (videoType === 'Beach_Night') setVideo(Beach_Night);
    
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