import styles from "../register//Register.module.css";

export function Register() {
    return (
        <>
            <div className={styles.registerWrapper}>
                <form className={styles.registerFormCard}>
                    <h1 className={styles.formHeader}>Register</h1>
                    <label htmlFor="accountName">Account: </label>
                    <input type="text" name="accountName" />
                    <label htmlFor="email">Email Address: </label>
                    <input type="text" name="email" />
                    <label htmlFor="repeatEmail">Repeat email address: </label>
                    <input type="text" name="repeatEmail" />
                    <label htmlFor="password">Password: </label>
                    <input type="text" name="password" />{" "}
                    <label htmlFor="repeatPassword">Repeat Password: </label>
                    <input type="text" name="repeatPassword" />
                    <button className={styles.registerButton} type="submit">
                        Register
                    </button>
                </form>

                <button className={styles.formNavigation}>Are you registered?</button>
            </div>
        </>
    );
}
