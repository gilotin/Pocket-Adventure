import { useEffect } from "react";
import styles from "./AuthErrorHandler.module.css";
import type { AuthErrorType } from "../../types/gameTypes";

type ErrorProps = {
    message: AuthErrorType;
    setAuthError: (value: string | null) => void;
};

export function AuthErrorHandler({ message, setAuthError }: ErrorProps) {
    useEffect(() => {
        if (!message) return;

        const errorTimer = setTimeout(() => {
            setAuthError(null);
        }, 1000);

        return () => clearTimeout(errorTimer);
    }, [message, setAuthError]);

    return (
        <>
            <div className={styles.errorCard}>
                <p className={styles.errorMessage}>{message}</p>
            </div>
        </>
    );
}
