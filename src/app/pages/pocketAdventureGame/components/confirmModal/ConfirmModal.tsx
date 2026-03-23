import styles from "./ConfirmModal.module.css";

type ConfirmProps = {
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmModal({ onConfirm, onCancel }: ConfirmProps) {
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
