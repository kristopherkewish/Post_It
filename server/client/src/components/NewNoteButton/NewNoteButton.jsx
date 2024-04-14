import styles from './NewNoteButton.module.css';
import { Link } from 'react-router-dom';

export default function NewNoteButton() {
    return (
        <Link to="/new"><button className={styles.newNoteButton}>+</button></Link>
    )
}