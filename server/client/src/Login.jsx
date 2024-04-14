import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import { login } from './utils/login.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleClick = async () => {
        login(username, password)
            .then(data => data.success ? navigate('/') : setErrorMessage(data.message))
            .catch(e => console.log(e));
    }

    return(
        <div className={styles.container}>
            <h1>Post-it</h1>
            <form className={styles.loginForm}>
                <label htmlFor="username" className={styles.label}>Username: </label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className={styles.username} />
                <label htmlFor="password" className={styles.label}>Password: </label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
            </form>
            <span style={{color: 'red'}}>{errorMessage}</span>
            <div className={styles.btnContainer}>
                <button 
                    className={styles.loginBtn}
                    onClick={handleClick}>
                        Login
                </button>
                <Link to="/signUp">
                    <button 
                        className={`${styles.loginBtn} ${styles.signUpBtn}`}>
                            Sign Up
                    </button>
                </Link>
            </div>
        </div>
    )
}