import styles from './Login.module.css';
import { login } from './utils/login.js';

export default function Login() {
    return(
        <div className={styles.container}>
            <h1>Post-it</h1>
            <button className={styles.loginBtn} onClick={() => login()}>Login With Google</button>
        </div>
    )
}