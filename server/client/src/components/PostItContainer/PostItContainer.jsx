import styles from './PostItContainer.module.css';
import PostIt from '../PostIt/PostIt.jsx';
import EditPostIt from '../EditPostIt/EditPostIt.jsx';

export default function PostItContainer({ notes, editMode, onNoteDelete, onEditClick, onUpdateClick }) {
    return (
        <div className={styles.container}>
            {notes.map((note) => {
                if (note.id !== editMode) {
                    return (
                        <PostIt
                            key={note.id}
                            title={note.title}
                            content={note.content}
                            onNoteDelete={() => onNoteDelete(note.id)}
                            onEditClick={() => onEditClick(note.id)}
                        />
                    )
                } else {
                    return (
                        <EditPostIt 
                            id={note.id}
                            title={note.title}
                            content={note.content}
                            onUpdateClick={onUpdateClick}
                        />
                    )
                }
            })}
        </div>
    )
}   