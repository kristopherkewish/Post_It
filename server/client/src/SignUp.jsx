import styles from './SignUp.module.css';
import { signUp } from './utils/signUp.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const checkPasswordMatch = () => {
        if(newPassword === confirmPassword) {
            return;
        }

        setErrorMessage('Passwords must match.');
    }

    const handleClick = () => {
        checkPasswordMatch();
        try {
            newPassword == confirmPassword && signUp(username, newPassword)
                .then(data => data.success ? navigate('/login') : setErrorMessage(data.message));
        } catch(e) {
            console.log(e);
        }
        
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
                <label htmlFor="password" className={styles.label}>New Password: </label>
                <input 
                    type="password" 
                    id="new-password" 
                    name="newPassword" 
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)} 
                    className={styles.username} />
                <label htmlFor="password" className={styles.label}>Confirm Password: </label>
                <input 
                    type="password" 
                    id="confirm-password" 
                    name="confirmPassword" 
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)} />
            </form>
            <span style={{ color: 'red' }}>{errorMessage}</span>
            <div className={styles.btnContainer}>
                <button 
                    className={`${styles.loginBtn} ${styles.signUpBtn}`}
                    onClick={handleClick}>Sign Up</button>
            </div>
        </div>
    )
}