import styles from './Header.module.css';
import { signOut } from '../../utils/signOut.js';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <h1>
                POST IT!
            </h1>
            <div className={styles.signOut}><Link to="/login" onClick={signOut}>Sign Out</Link></div>
        </header>
    )
}