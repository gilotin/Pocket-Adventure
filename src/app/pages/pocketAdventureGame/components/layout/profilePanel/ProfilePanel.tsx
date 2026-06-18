import type { AccountData } from "../../../types/gameTypes";
import styles from "./ProfilePanel.module.css";

type ProfilePanelProps = {
    accountData: AccountData;
    handleGameMenu: () => void;
};

export function ProfilePanel({ accountData, handleGameMenu }: ProfilePanelProps) {
    return (
        <div className={styles.overlay}>
            <nav className={styles.navigation}>
                <button className={styles.logoutBtn} onClick={handleGameMenu}>
                    Back
                </button>
            </nav>
            <section className={styles.profilePanel}>
                <header>
                    <h1 className={styles.header}>Profile Panel</h1>
                </header>

                <div className={styles.permanentInfo}>
                    <div className={styles.infoGroup}>
                        <div className={styles.fieldLabel}>Account:</div>
                        <p className={styles.fieldValue}>{accountData?.profileName}</p>
                    </div>

                    <div className={styles.infoGroup}>
                        <p>Email:{accountData?.email}</p>
                    </div>
                </div>

                <form className={styles.form}>
                    <div className={styles.infoGroup}>
                        <label htmlFor="profileName">Profile Name:</label>
                        <input id="profileName" type="text" value={accountData?.profileName} />
                    </div>

                    <div className={styles.infoGroup}>
                        <label htmlFor="password">password:</label>
                        <input id="password" type="password" placeholder="New password" />
                    </div>
                    <button>change</button>
                </form>
            </section>
        </div>
    );
}
