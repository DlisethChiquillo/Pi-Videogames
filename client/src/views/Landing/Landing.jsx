import styles from './landing.module.css'
import { NavLink } from 'react-router-dom';
import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo';
import { useEffect, useState } from 'react';
const BACKGROUNDTYPE = 'Mario1'

const Landing = () => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 100)
        return () => setLoading(true);
    },[]);

    if (loading) {
        return(<div className={styles.divBlack} ></div>);
    };

    return(
        <div className={styles.divLanding} >
            <BackgroundVideo videoType={BACKGROUNDTYPE}/>
            <div className={styles.divButton}>
                <NavLink to='/home'  className={styles.navLinkButton} >W E L C O M E !</NavLink>
            </div>
        </div>
    )
}

export default Landing;