import styles from "./GameNotificationCard.module.css";

type GameNotificationProps = {
    message: string;
};

export function GameNotificationCard({ message }: GameNotificationProps) {
    return (
        <div className={styles.notificationWrapper}>
            <div className={styles.notificationCard}>
                <p className={styles.message}>{message}</p>
            </div>
        </div>
    );
}
