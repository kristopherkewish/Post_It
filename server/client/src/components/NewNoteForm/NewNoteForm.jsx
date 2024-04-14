import styles from './NewNoteForm.module.css';
import { createNote } from '../../utils/createNote.js';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NewNoteForm({ onSubmit }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        createNote({ title, content })
            .then(() => {
                setTitle('');
                setContent('');
                navigate('/');
            })
            .catch(err => console.log('Error creating note!', err));
    };

    return (
        <>
            <div className={styles.container}>
                <Link className={styles.cancel} to="/">x</Link>
                <h3>Write New Note: </h3>
                <form className={styles.newNoteForm} onSubmit={handleSubmit}>
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