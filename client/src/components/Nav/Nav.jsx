import { NavLink } from 'react-router-dom';
import styles from './nav.module.css';


const Nav = () => {
    return(
        <div className={styles.divNav}>
             <nav className={styles.nav}> 
            
                <ul className={styles.navList}>
                    <li><NavLink className={styles.aNav} to='/home'>Home</NavLink></li>
                    <li><NavLink className={styles.aNav} to='/form'>Create</NavLink></li>
                  
                </ul>
             </nav> 
        </div>
    )
}

export default Nav;