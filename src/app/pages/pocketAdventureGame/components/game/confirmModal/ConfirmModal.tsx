import styles from "./ConfirmModal.module.css";

type ConfirmProps = {
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmModal({ onConfirm, onCancel }: ConfirmProps) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modalWrapper}>
                <h3 className={styles.modalHeader}>Are you sure?</h3>
                <div className={styles.buttonWrapper}>
                    <button
                        onClick={onConfirm}
                        className={`${styles.modalBtn} ${styles.modalConfirm}`}
                    >
                        YES
                    </button>
                    <button
                        onClick={onCancel}
                        className={`${styles.modalBtn} ${styles.modalRefuse}`}
                    >
                        NO
                    </button>
                </div>
            </div>
        </div>
    );
}
