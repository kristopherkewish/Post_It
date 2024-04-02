import styles from './Login.module.css';

export default function Login() {
    return(
        <div className={styles.container}>
            <h1>Post-it</h1>
            <form className={styles.loginForm}>
                <label htmlFor="username" className={styles.label}>Username: </label>
                <input type="text" id="username" name="username" className={styles.username} />
                <label htmlFor="password" className={styles.label}>Password: </label>
                <input type="password" id="password" name="password"  />
            </form>
            <div className={styles.btnContainer}>
                <button className={styles.loginBtn}>Login</button>
                <button className={`${styles.loginBtn} ${styles.signUpBtn}`}>Sign Up</button>
            </div>
            
        </div>
    )
}