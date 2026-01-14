import type React from "react";
import styles from "../login/Login.module.css";
import { Form } from "react-router";

type AuthMode = "login" | "register";

type LoginProps = {
    setIsAuthenticated: (value: boolean) => void;
    setAuthMode: (mode: AuthMode) => void;
};

type LoginData = {
    loginName: string;
    loginPassword: string;
};

export function Login({ setIsAuthenticated, setAuthMode }: LoginProps) {
    const handleRegisterNavigation = () => {
        setAuthMode("register");
    };

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as unknown as LoginData;

        console.log(data.loginName, data.loginPassword);

        // only for internal use
        if (data.loginName && data.loginPassword) {
            setIsAuthenticated(true);
        } else {
            throw new Error("Fill the fields");
        }
    }

    return (
        <section className={styles.loginFormWrapper}>
            <div className={styles.loginFormCard}>
                <form className={styles.loginForm} onSubmit={handleLogin}>
                    <label htmlFor="loginName">account:</label>
                    <input name="loginName" id="loginName" type="text" />
                    <label htmlFor="loginPassword">password:</label>
                    <input name="loginPassword" id="loginPassword" type="password" />
                    <button type="submit">Login</button>
                </form>
                <button className={styles.formNavigation}>Forgot your password?</button>
                <button className={styles.formNavigation} onClick={handleRegisterNavigation}>
                    Want to register?
                </button>
            </div>
        </section>
    );
}
