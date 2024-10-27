import { React } from 'react'
import styles from "./SignIn.module.css"

function ErrorMessage({ error }) {
    let errorMessage
    let errorDescription = error.response.data.error_description

    switch (error.status) {
        case 401:
        case 422:
            console.log(errorDescription)
            // errorMessage = error.response.data.error
            errorDescription = errorDescription.map((err, idx) => <li key={idx}>{err}</li>)
            break;
        default:
            console.log(error)
            errorMessage = error.message
    }
     
    return (
        <>
            <h2 className={styles.error}>{errorMessage}</h2>
            <div className={styles.error}>{errorDescription}</div>
        </>
    )
}

export default ErrorMessage