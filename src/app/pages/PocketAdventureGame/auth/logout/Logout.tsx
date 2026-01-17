import styles from "./Logout.module.css";

type LogoutProps = {
    onConfirm: () => void;
    onCancel: () => void;
};

export function Logout({ onConfirm, onCancel }: LogoutProps) {
    return (
        <>
            <div className={styles.logoutWrapper}>
                <h3 className={styles.logoutHeader}>Are you sure?</h3>
                <div className={styles.buttonWrapper}>
                    <button
                        onClick={onConfirm}
                        className={`${styles.logoutBtn} ${styles.LogoutAccept}`}
                    >
                        YES
                    </button>
                    <button
                        onClick={onCancel}
                        className={`${styles.logoutBtn} ${styles.buttonRefuse}`}
                    >
                        NO
                    </button>
                </div>
            </div>
        </>
    );
}
