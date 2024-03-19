import styles from './EditPostIt.module.css';
import EditNoteForm from '../EditNoteForm/EditNoteForm.jsx';

export default function EditPostIt({ index, title, content, onUpdateClick }) {
    return (
        <div className={styles.postIt}>
            <EditNoteForm 
                index={index}
                initialTitle={title}
                initialContent={content}
                onUpdateClick={onUpdateClick}
            />
        </div>
    )
}