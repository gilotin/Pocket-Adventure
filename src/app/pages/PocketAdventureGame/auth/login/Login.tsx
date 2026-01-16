import type React from "react";
import styles from "../login/Login.module.css";

type AuthMode = "login" | "register";

type LoginProps = {
    setIsAuthenticated: (value: boolean) => void;
    setAuthMode: (mode: AuthMode) => void;
    setAuthError: (value: null | string) => void;
};

export function Login({ setIsAuthenticated, setAuthMode, setAuthError }: LoginProps) {
    const handleRegisterNavigation = () => {
        setAuthMode("register");
    };

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const accountNameCheck = /^[A-Za-z0-9_]+$/;

        const formData = new FormData(e.currentTarget);

        const loginName = formData.get("loginName");
        const loginPassword = formData.get("loginPassword");

        // Right now will throw errors till i create error handler

        if (typeof loginName !== "string" || typeof loginPassword !== "string") {
            setAuthError("No empty inputs allowed!");
            return;
        }

        const trimmedName = loginName.trim();
        const trimmedPassword = loginPassword.trim();

        if (trimmedName === "" || trimmedPassword === "") {
            setAuthError("No empty inputs allowed!");
            return;
        }

        if (trimmedName.length < 6 || trimmedPassword.length < 6) {
            setAuthError("account and password must contain at least 6 characters!");
            return;
        }

        if (!trimmedName.match(accountNameCheck)) {
            setAuthError("You can use only letters, numbers and underscore!");
            return;
        }

        // const normalizedName = trimmedName.toLocaleLowerCase();
        setIsAuthenticated(true);
    }

    return (
        <section className={styles.loginFormWrapper}>
            <div className={styles.loginFormCard}>
                <form className={styles.loginForm} onSubmit={handleLogin}>
                    <h1 className={styles.loginHeader}>Login</h1>
                    <label htmlFor="loginName">account:</label>
                    <input autoComplete="username" name="loginName" id="loginName" type="text" />
                    <label htmlFor="loginPassword">password:</label>
                    <input
                        autoComplete="current-password"
                        name="loginPassword"
                        id="loginPassword"
                        type="password"
                    />
                    <button className={styles.loginButton} type="submit">
                        Login
                    </button>
                </form>
                <button className={styles.formNavigation}>Forgot your password?</button>
                <button className={styles.formNavigation} onClick={handleRegisterNavigation}>
                    Want to register?
                </button>
            </div>
        </section>
    );
}
