import { useEffect } from "react";
import styles from "./AuthErrorHandler.module.css";

type ErrorProps = {
    message: string;
    setAuthError: (value: string | null) => void;
};
export function AuthErrorHandler({ message, setAuthError }: ErrorProps) {
    useEffect(() => {
        const errorTimer = setTimeout(() => {
            setAuthError(null);
        }, 1000);

        return () => clearTimeout(errorTimer);
    }, [setAuthError]);

    return (
        <>
            <div className={styles.errorCard}>
                <p className={styles.errorMessage}>{message}</p>
            </div>
        </>
    );
}
