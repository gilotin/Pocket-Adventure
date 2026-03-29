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
                <button
                    className={styles.menuButton}
                    onClick={() => handleAuthAction("login")}
                    id="login"
                >
                    Login
                </button>
                <button
                    className={styles.menuButton}
                    onClick={() => handleAuthAction("register")}
                    id="register"
                >
                    Register
                </button>
                <button
                    className={styles.menuButton}
                    onClick={() => handleAuthAction("guest")}
                    id="guest"
                >
                    Guest Login
                </button>
            </ul>
        </section>
    );
}
