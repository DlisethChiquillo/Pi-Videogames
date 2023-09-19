import styles from './error.module.css'
//import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo'
import Delorean from '../../components/Delorean/Delorean'
import { useEffect, useState } from 'react'
//const BACKGROUNDTYPE = 'Skull'

const Error = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 100)
        return () => setLoading(true);
    },[]);

    if (loading) {
        return(<div ></div>);
    };

    return (
        <div className={styles.divError}>
        <div className={styles.divContent}>
            <div className={styles.divDelorean}>
                <div className={styles.divBubble}><p>Come back home kid!</p></div>
                <Delorean />
            </div>
            <h1 className={styles.h1Name}>404</h1>
            <p className={styles.pName}>Page Not Found!</p>
        </div>
        {/* <BackgroundVideo videoType={BACKGROUNDTYPE}/> */}
    </div>
)
}
export default Error;