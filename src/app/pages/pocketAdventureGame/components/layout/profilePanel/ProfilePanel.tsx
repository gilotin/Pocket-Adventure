import type React from "react";
import type { AccountData } from "../../../types/gameTypes";
import styles from "./ProfilePanel.module.css";

type ProfilePanelProps = {
    accountData: AccountData;
    handleGameMenu: () => void;
    changeProfileInfo: (value: string) => void;
};

export function ProfilePanel({
    accountData,
    handleGameMenu,
    changeProfileInfo,
}: ProfilePanelProps) {
    const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const regex = /^[a-zA-Z0-9]{6,10}$/;
        const formData = new FormData(e.currentTarget);

        const profileName = formData.get("profileName");

        if (typeof profileName !== "string") {
            return;
        }

        // Will add UI for the errors later

        if (profileName === "") {
            console.log("Please fill the input!");
            return;
        }
        if (!regex.test(profileName)) {
            console.log("Profile name must contain 6-8 letters or numbers.");
            return;
        }

        const trimmedProfileName = profileName.trim();

        changeProfileInfo(trimmedProfileName);
    };

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

                <form onSubmit={handleProfileSubmit} className={styles.form}>
                    <div className={styles.infoGroup}>
                        <label htmlFor="profileName">Profile Name:</label>
                        <input
                            id="profileName"
                            type="text"
                            placeholder={accountData?.profileName}
                            name="profileName"
                        />
                    </div>

                    {/* 
                        NOTE: This features wait for Firebase auth or proper backend.
                    <div className={styles.infoGroup}>
                        <label htmlFor="password">password:</label>
                        <input id="password" type="password" placeholder="New password" />
                    </div> */}
                    <button>change</button>
                </form>
            </section>
        </div>
    );
}
