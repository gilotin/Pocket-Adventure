import type { AuthAction } from "../../types/gameTypes";
import styles from "./AuthMenu.module.css";

type AuthProps = {
    handleAuthAction: (mode: AuthAction) => void;
};

export function AuthMenu({ handleAuthAction: handleAuthAction }: AuthProps) {
    return (
        <div className={styles.wrapper}>
            <ul>
                <button onClick={() => handleAuthAction("login")} id="login">
                    Login
                </button>
                <button onClick={() => handleAuthAction("register")} id="register">
                    Register
                </button>
                <button onClick={() => handleAuthAction("guest")} id="guest">
                    Guest Login
                </button>
            </ul>
        </div>
    );
}
