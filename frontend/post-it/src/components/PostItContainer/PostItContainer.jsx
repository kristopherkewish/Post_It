import styles from './PostItContainer.module.css';
import PostIt from '../PostIt/PostIt.jsx';
import EditPostIt from '../EditPostIt/EditPostIt.jsx';

export default function PostItContainer({ notes, editMode, onNoteDelete, onEditClick, onUpdateClick }) {
    return (
        <div className={styles.container}>
            {notes.map((note, index) => {
                if (index !== editMode) {
                    return (
                        <PostIt
                            key={index}
                            title={note.title}
                            content={note.content}
                            onNoteDelete={() => onNoteDelete(index)}
                            onEditClick={() => onEditClick(index)}
                        />
                    )
                } else {
                    return (
                        <EditPostIt 
                            index={index}
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