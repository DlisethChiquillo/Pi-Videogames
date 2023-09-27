import styles from './error.module.css'
import { useEffect, useState } from 'react'


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
            <div >
                <div className={styles.divBubble}><p>Come back home kid!</p></div>
                
            </div>
            <h1 className={styles.h1Name}>404</h1>
            <p className={styles.pName}>Page Not Found!</p>
        </div>
     
    </div>
)
}
export default Error;