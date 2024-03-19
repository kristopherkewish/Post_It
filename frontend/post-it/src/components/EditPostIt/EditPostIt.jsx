import styles from './EditPostIt.module.css';
import EditNoteForm from '../EditNoteForm/EditNoteForm.jsx';

export default function EditPostIt({ id, title, content, onUpdateClick }) {
    return (
        <div className={styles.postIt}>
            <EditNoteForm 
                id={id}
                initialTitle={title}
                initialContent={content}
                onUpdateClick={onUpdateClick}
            />
        </div>
    )
}