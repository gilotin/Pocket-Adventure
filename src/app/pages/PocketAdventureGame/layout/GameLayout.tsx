import styles from "./GameLayout.module.css";
import { PocketAdventurePage } from "../PocketAdventurePage";
import { useEffect, useState } from "react";
import { Login } from "../auth/login/Login";
import { Register } from "../auth/register/Register";
import { AuthErrorHandler } from "../components/authErrorHandler/AuthErrorHandler";
import { Logout } from "../auth/logout/Logout";
import { logout } from "../services/logout";
import { TestItemGenerator } from "../MockedData/TestItemGenerator";

export type AuthStatus = "unknown" | "guest" | "authenticated";
export type AuthMode = "login" | "register";
type AuthErrorType = string | null;

export type AccountData = {
    accountName: string;
    profileName: string;
    email: string;
} | null;

type Item = {
    itemId: number;
    name: string;
    type: string;
    quantity: number;
};
export function GameLayout() {
    const [authStatus, setAuthStatus] = useState<AuthStatus>("authenticated");
    const [authMode, setAuthMode] = useState<AuthMode>("login");
    const [authError, setAuthError] = useState<AuthErrorType>(null);
    const [userData, setUserData] = useState<AccountData>(null);
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState<boolean>(false);

    // // Session restoration on app load
    // useEffect(() => {
    //     const storageData = localStorage.getItem("accountData");

    //     if (!storageData) {
    //         setAuthStatus("guest");
    //         return;
    //     }

    //     try {
    //         const parsedData: AccountData = JSON.parse(storageData);
    //         setUserData(parsedData);
    //         setAuthStatus("authenticated");
    //     } catch {
    //         setUserData(null);
    //         setAuthStatus("guest");
    //     }
    // }, []);

    const handleLogout = () => {
        logout();
        setUserData(null);
        setAuthStatus("guest");
        setAuthMode("login");
        setIsLogoutConfirmOpen(false);
    };

    if (authStatus === "unknown") {
        return null;
    }

    if (authStatus === "authenticated") {
        return (
            <>
                <div className={styles.layoutBackground}>
                    <div className={styles.gameWrapper}>
                        <header className={styles.gameHeader}>
                            <p>Hello {userData?.accountName}!</p>
                            <p>Stats</p>
                            <button onClick={() => setIsLogoutConfirmOpen(true)}>logout</button>
                        </header>
                        <main className={styles.mainGame}>
                            <div>
                                {/* It's for testing!!! */}
                                <TestItemGenerator />
                            </div>

                            <PocketAdventurePage />
                        </main>

                        <footer>
                            <p>Test footer. All bla bla reserved. 2025</p>
                        </footer>
                    </div>
                </div>
                {isLogoutConfirmOpen && (
                    <Logout
                        onConfirm={handleLogout}
                        onCancel={() => setIsLogoutConfirmOpen(false)}
                    />
                )}
                {authError && <AuthErrorHandler message={authError} setAuthError={setAuthError} />}
            </>
        );
    }

    return (
        <>
            {authMode === "login" ? (
                <Login
                    setAuthStatus={setAuthStatus}
                    setAuthMode={setAuthMode}
                    setAuthError={setAuthError}
                    setUserData={setUserData}
                />
            ) : (
                <Register setAuthMode={setAuthMode} setAuthError={setAuthError} />
            )}

            {authError && <AuthErrorHandler message={authError} setAuthError={setAuthError} />}
        </>
    );
}
