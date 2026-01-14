import type React from "react";
import styles from "../login/Login.module.css";

type AuthMode = "login" | "register";

type LoginProps = {
    setIsAuthenticated: (value: boolean) => void;
    setAuthMode: (mode: AuthMode) => void;
};

export function Login({ setIsAuthenticated, setAuthMode }: LoginProps) {
    const handleRegisterNavigation = () => {
        setAuthMode("register");
    };

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const loginName = formData.get("loginName");
        const loginPassword = formData.get("loginPassword");

        if (typeof loginName !== "string" || typeof loginPassword !== "string") {
            throw new Error("Missing form data");
        }

        const trimmedName = loginName.trim();
        // const trimmedPassword = loginPassword.trim();

        console.log(trimmedName, "Logged in");

        // only for internal use
        if (loginName && loginPassword) {
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
