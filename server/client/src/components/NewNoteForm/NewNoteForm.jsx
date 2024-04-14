import styles from './NewNoteForm.module.css';
import { useState } from 'react';

export default function NewNoteForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        onSubmit({title, content});

        setTitle('');
        setContent('');
    }

    return (
        <>
            <div className={styles.container}>
                <h3>Write New Note: </h3>
                <form onSubmit={handleSubmit}>
                    <div className={styles.title}>
                        <label htmlFor="title">Title: </label>
                        <input 
                            type="text" 
                            id="title" 
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className={styles.title}
                        />
                    </div>
                    <div className={styles.content}>
                        <label htmlFor="title">Content: </label>
                        <textarea 
                            id="title" 
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            className={styles.content}
                        />
                    </div>
                    <input type="submit" value="Create!" className={styles.create} />
                </form>
            </div>
        </>
    )
}