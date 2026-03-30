import type { AuthAction } from "../../types/gameTypes";
import styles from "./AuthMenu.module.css";

type AuthProps = {
    handleAuthAction: (mode: AuthAction) => void;
};

export function AuthMenu({ handleAuthAction: handleAuthAction }: AuthProps) {
    return (
        <section className={styles.wrapper}>
            <h1 className={styles.menuHeader}>Pocket Adventure</h1>
            <ul className={styles.menuList}>
                <li className={styles.menuListItem}>
                    <button
                        className={styles.menuButton}
                        onClick={() => handleAuthAction("login")}
                        id="login"
                    >
                        Login
                    </button>
                </li>
                <li className={styles.menuListItem}>
                    <button
                        className={styles.menuButton}
                        onClick={() => handleAuthAction("register")}
                        id="register"
                    >
                        Register
                    </button>
                </li>
                <li className={styles.menuListItem}>
                    <button
                        className={styles.menuButton}
                        onClick={() => handleAuthAction("guest")}
                        id="guest"
                    >
                        Guest Login
                    </button>
                </li>
            </ul>
            <footer className={styles.menuFooter}>
                <p>This game is currently in development.</p>
                <p> Nikolay Toshev 2026</p>
            </footer>
        </section>
    );
}
