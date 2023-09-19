import { NavLink } from 'react-router-dom';
import styles from './nav.module.css';
import Delorean from '../Delorean/Delorean';

const Nav = () => {
    return(
        <div className={styles.divNav}>
             <nav className={styles.nav}> 
                <div className={styles.divDelorean}>
                    <Delorean />
                </div>
                <ul className={styles.navList}>
                    <li><NavLink className={styles.aNav} to='/home'>Home</NavLink></li>
                    <li><NavLink className={styles.aNav} to='/form'>Create</NavLink></li>
                    <li><NavLink className={styles.aNav} to='/about'>About</NavLink></li>
                </ul>
             </nav> 
        </div>
    )
}

export default Nav;