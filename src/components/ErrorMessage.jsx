import { React } from 'react'
import styles from "./SignIn.module.css"

function ErrorMessage({ error }) {
    const errMessages = error.map((err, idx) => <li key={idx}>{err}</li>)

    return (
        <div className={styles.error}>{errMessages}</div>
    )
}

export default ErrorMessage