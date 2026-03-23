import styles from "./GameLayout.module.css";
import { PocketAdventurePage } from "../PocketAdventurePage";
import { useEffect, useState } from "react";
import { Login } from "../auth/login/Login";
import { Register } from "../auth/register/Register";
import { AuthErrorHandler } from "../components/authErrorHandler/AuthErrorHandler";
import { ConfirmModal } from "../components/confirmModal/ConfirmModal";
import { logout } from "../services/logout";
import type { AccountData, AuthErrorType, AuthMode, AuthStatus } from "../types/gameTypes";
import { TestItemGenerator } from "../mockedData/TestItemGenerator";

export function GameLayout() {
    const [authStatus, setAuthStatus] = useState<AuthStatus>("authenticated");
    const [authMode, setAuthMode] = useState<AuthMode>("login");
    const [authError, setAuthError] = useState<AuthErrorType>(null);
    const [userData, setUserData] = useState<AccountData>(null);
    // const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

    useEffect(() => {
        const storageData = localStorage.getItem("accountData");

        if (!storageData) {
            setAuthStatus("guest");
            return;
        }

        try {
            const parsedData: AccountData = JSON.parse(storageData);
            setUserData(parsedData);
            setAuthStatus("authenticated");
        } catch {
            setUserData(null);
            setAuthStatus("guest");
        }
    }, []);

    const handleLogout = () => {
        logout();
        setUserData(null);
        setAuthStatus("guest");
        setAuthMode("login");
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
                            <button onClick={() => setConfirmAction(() => handleLogout)}>
                                logout
                            </button>
                        </header>
                        <main className={styles.mainGame}>
                            <div>
                                {/* It's for testing!!! */}
                                <TestItemGenerator />
                            </div>

                            <PocketAdventurePage setConfirmAction={setConfirmAction} />
                        </main>

                        <footer>
                            <p>Test footer. All bla bla reserved. 2025</p>
                        </footer>
                    </div>
                </div>
                {confirmAction && (
                    <ConfirmModal
                        onConfirm={() => {
                            confirmAction();
                            setConfirmAction(null);
                        }}
                        onCancel={() => setConfirmAction(null)}
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
