import styles from "./GameLayout.module.css";
import { PocketAdventurePage } from "../PocketAdventurePage";
import { useEffect, useState } from "react";
import { AuthErrorHandler } from "../components/authErrorHandler/AuthErrorHandler";
import { ConfirmModal } from "../components/confirmModal/ConfirmModal";
import { logout } from "../services/logout";
import type {
    // AccountData,
    AuthAction,
    AuthErrorType,
    AuthMode,
    AuthUser,
} from "../types/gameTypes";
// import { TestItemGenerator } from "../mockedData/TestItemGenerator";
import { AuthMenu } from "../auth/authMenu/AuthMenu";
import { Register } from "../auth/register/Register";
import { Login } from "../auth/login/Login";
import { loginAsGuest } from "../auth/authService";
import { AUTH_KEY } from "../constants/gameConstants";

export function GameLayout() {
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);
    const [authMode, setAuthMode] = useState<AuthMode>("menu");
    const [authError, setAuthError] = useState<AuthErrorType>(null);
    // const [userData, setUserData] = useState<AccountData>(null);
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");

        if (!storedAuth) {
            setAuthUser(null);
            return;
        }

        try {
            const parsedData: AuthUser = JSON.parse(storedAuth);
            setAuthUser(parsedData);
        } catch {
            setAuthUser(null);
        }
    }, []);

    const handleLogout = () => {
        logout();
        // setUserData(null);
        // To compare the characterData id vs auth id and if not the same to crate new characterData
        setAuthUser(null);
        setAuthMode("menu");
        localStorage.removeItem(AUTH_KEY);
    };

    const handleAuthAction = (action: AuthAction) => {
        if (action === "guest") {
            const guest = loginAsGuest();
            setAuthUser(guest);
            return;
        }

        setAuthMode(action);
    };

    const AuthMenuMap = {
        login: (
            <Login
                setAuthMode={setAuthMode}
                setAuthError={setAuthError}
                setAuthUser={setAuthUser}
            />
        ),
        register: (
            <Register
                setAuthMode={setAuthMode}
                setAuthError={setAuthError}
                setAuthUser={setAuthUser}
            />
        ),
        menu: <AuthMenu handleAuthAction={handleAuthAction} />,
    };

    if (authUser !== null) {
        return (
            <>
                <div className={styles.layoutBackground}>
                    <div className={styles.gameWrapper}>
                        <header className={styles.gameHeader}>
                            {/* Latter will add proper profile name visualization */}
                            <p>Hello Adventurer!</p>
                            <p>Stats</p>
                            <button onClick={() => setConfirmAction(() => handleLogout)}>
                                logout
                            </button>
                        </header>
                        <main className={styles.mainGame}>
                            {/* <div>
                                <TestItemGenerator />
                            </div> */}

                            <PocketAdventurePage setConfirmAction={setConfirmAction} />
                        </main>
                    </div>

                    <div className={styles.displayMessage}>
                        <p>Displays below 768px are currently unavailable.</p>
                        <p>Please check again later. Thanks for the understanding.</p>
                        <p>
                            You can force the game with <i>"Desktop site"</i> option on your phone
                        </p>
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
            {AuthMenuMap[authMode]}

            {authError && <AuthErrorHandler message={authError} setAuthError={setAuthError} />}
        </>
    );
}
