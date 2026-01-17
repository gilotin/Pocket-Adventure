import styles from "./GameLayout.module.css";
import { PocketAdventurePage } from "../PocketAdventurePage";
import { useEffect, useState } from "react";
import { Login } from "../auth/login/Login";
import { Register } from "../auth/register/Register";
import { AuthErrorHandler } from "../components/authErrorHandler/AuthErrorHandler";

export type AuthStatus = "unknown" | "guest" | "authenticated";
type AuthMode = "login" | "register";
type AuthErrorType = string | null;
type AccountData = {
    accountName: string;
    profileName: string;
    email: string;
};

export function GameLayout() {
    const [authStatus, setAuthStatus] = useState<AuthStatus>("unknown");
    const [authMode, setAuthMode] = useState<AuthMode>("login");
    const [authError, setAuthError] = useState<AuthErrorType>(null);
    const [userData, setUserData] = useState<AccountData | null>(null);

    // To refactor it and make it more readable

    useEffect(() => {
        const storageData = localStorage.getItem("accountData");
        if (!storageData) {
            // Using unknown till I implement guest mode
            setAuthStatus("unknown");
            return;
        }

        try {
            const parsedData: AccountData = JSON.parse(storageData);
            setUserData(parsedData);
            setAuthStatus("authenticated");
        } catch (error) {
            setUserData(null);
            setAuthStatus("unknown");
        }
    }, []);

    return (
        <>
            {authStatus === "unknown" ? (
                authMode === "login" ? (
                    <Login
                        setIsAuthenticated={setAuthStatus}
                        setAuthMode={setAuthMode}
                        setAuthError={setAuthError}
                        setUserData={setUserData}
                    />
                ) : (
                    <Register setAuthMode={setAuthMode} setAuthError={setAuthError} />
                )
            ) : (
                <div className={styles.layoutBackground}>
                    <div className={styles.gameWrapper}>
                        <header className={styles.gameHeader}>
                            <p>Hello {userData?.accountName}!</p>
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
