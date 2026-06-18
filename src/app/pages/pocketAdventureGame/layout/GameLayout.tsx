import styles from "./GameLayout.module.css";
import { PocketAdventurePage } from "../PocketAdventurePage";
import { useEffect, useState } from "react";
import { ConfirmModal } from "../components/game/confirmModal/ConfirmModal";
import { logout } from "../services/logout";
import type {
    AccountData,
    AuthAction,
    AuthErrorType,
    AuthMode,
    AuthUser,
} from "../types/gameTypes";
import { AuthMenu } from "../auth/authMenu/AuthMenu";
import { Register } from "../auth/register/Register";
import { Login } from "../auth/login/Login";
import { loginAsGuest } from "../auth/authService";
import { ACCOUNT_KEY, AUTH_KEY } from "../constants/gameConstants";
import { AuthError } from "../components/layout/authError/AuthError";
import profilePicture from "../../../../../public/assets/profile_male_profile.png";
import { ProfilePanel } from "../components/layout/profilePanel/ProfilePanel";

export function GameLayout() {
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);
    const [authMode, setAuthMode] = useState<AuthMode>("menu");
    const [authError, setAuthError] = useState<AuthErrorType>(null);
    const [accountData, setAccountData] = useState<AccountData>(null);
    const [gameMapState, setGameMapState] = useState<"profile" | "game">("game");
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

    useEffect(() => {
        const storedUser = localStorage.getItem(ACCOUNT_KEY);

        if (!storedUser) return setAccountData(null);

        const user = JSON.parse(storedUser);
        setAccountData(user);
    }, []);

    const handleLogout = () => {
        logout();
        setAccountData(null);
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

    const handleGameMenu = () => {
        if (gameMapState === "game") return setGameMapState("profile");
        return setGameMapState("game");
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

    const GameMenuMap = {
        profile: <ProfilePanel accountData={accountData} handleGameMenu={handleGameMenu} />,
        game: (
            <div className={styles.layoutBackground}>
                <div className={styles.gameWrapper}>
                    <header className={styles.gameHeader}>
                        <button onClick={handleGameMenu} className={styles.characterBorder}>
                            <div className={styles.innerBorder}>
                                <p className={styles.userName}>
                                    {accountData ? accountData.profileName : "Guest"}
                                </p>
                                <div className={styles.iconBorder}>
                                    <img
                                        width={52}
                                        height={52}
                                        className={styles.profilePicture}
                                        src={profilePicture}
                                        alt="male warrior profile"
                                    />
                                </div>
                            </div>
                        </button>
                        <p className={styles.logo}>Pocket Adventure</p>
                        <button
                            className={styles.logout}
                            onClick={() => setConfirmAction(() => () => handleLogout())}
                        >
                            logout
                        </button>
                    </header>
                    <main className={styles.mainGame}>
                        <PocketAdventurePage setConfirmAction={setConfirmAction} />
                    </main>
                </div>

                <div className={styles.displayMessage}>
                    <div className={styles.messageCard}>
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

                {authError && <AuthError message={authError} setAuthError={setAuthError} />}
            </div>
        ),
    };

    if (authUser !== null) {
        return <div className={styles.layoutBackground}>{GameMenuMap[gameMapState]}</div>;
    }

    return (
        <div className={styles.layoutBackground}>
            {AuthMenuMap[authMode]}

            {authError && <AuthError message={authError} setAuthError={setAuthError} />}
        </div>
    );
}
