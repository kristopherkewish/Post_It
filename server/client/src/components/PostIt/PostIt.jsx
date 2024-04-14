import styles from './PostIt.module.css';

export default function PostIt({ title, content, onNoteDelete, onEditClick }) {
    return (
        <div className={styles.postIt}>
            <h2>{title}</h2>
            <p>{content}</p>
            <button className={styles.delete} onClick={onNoteDelete}>X</button>
            <button className={styles.edit} onClick={onEditClick}>Edit</button>
        </div>
    )
}