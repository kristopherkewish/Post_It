import styles from './EditNoteForm.module.css';
import { useState } from 'react';

export default function EditNoteForm({ id, initialTitle, initialContent, onUpdateClick }) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    const handleSubmit = event => {
        event.preventDefault();
        onUpdateClick(id, {title, content});
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.title}>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className={styles.title}
                />
            </div>
            <div className={styles.content}>
                <textarea
                    id="title"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className={styles.content}
                />
            </div>
            <input type="submit" value="Update" className={styles.update} />
        </form>
    )
}