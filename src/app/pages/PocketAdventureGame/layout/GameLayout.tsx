import styles from "./GameLayout.module.css";
import { PocketAdventurePage } from "../PocketAdventurePage";
import { useState, type JSX } from "react";
import { Login } from "../auth/login/Login";
import { Register } from "../auth/register/register";

type AuthMode = "login" | "register";

export function GameLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authMode, setAuthMode] = useState<AuthMode>("login");

    return (
        <>
            {!isAuthenticated ? (
                authMode === "login" ? (
                    <Login setIsAuthenticated={setIsAuthenticated} setAuthMode={setAuthMode} />
                ) : (
                    <Register />
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
        </>
    );
}
