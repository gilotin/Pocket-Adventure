import styles from "./GameLayout.module.css";
import { PocketAdventurePage } from "../PocketAdventurePage";
import { useState, type JSX } from "react";
import { Login } from "../auth/login/Login";
import { Register } from "../auth/register/Register";
import { AuthErrorHandler } from "../components/authErrorHandler/AuthErrorHandler";

export type AuthStatus = "unknown" | "guest" | "authenticated";
type AuthMode = "login" | "register";
type authErrorType = string | null;

export function GameLayout() {
    const [authStatus, setAuthStatus] = useState<AuthStatus>("unknown");
    const [authMode, setAuthMode] = useState<AuthMode>("login");
    const [authError, setAuthError] = useState<authErrorType>(null);

    // To refactor it and make it more readable

    return (
        <>
            {authStatus === "unknown" ? (
                authMode === "login" ? (
                    <Login
                        setIsAuthenticated={setAuthStatus}
                        setAuthMode={setAuthMode}
                        setAuthError={setAuthError}
                    />
                ) : (
                    <Register setAuthMode={setAuthMode} setAuthError={setAuthError} />
                )
            ) : (
                <div className={styles.layoutBackground}>
                    <div className={styles.gameWrapper}>
                        <header className={styles.gameHeader}>
                            <p>profiles</p>
                            <p>Stats</p>
                        </header>
                        <main className={styles.mainGame}>
                            <PocketAdventurePage />
                        </main>
                        <footer>
                            <p>Test footer. All bla bla reserved. 2025</p>
                        </footer>
                    </div>
                </div>
            )}

            {authError && <AuthErrorHandler message={authError} setAuthError={setAuthError} />}
        </>
    );
}
