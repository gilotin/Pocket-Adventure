import { useEffect, useState } from "react";
import type { ActiveMission } from "../../../types/gameTypes";
import styles from "./MissionProgressionModal.module.css";
import { formatTime } from "../../../utils/formatTime";

type MissionProgressionModalProps = {
    abandonMission: () => void;
    activeMission: ActiveMission;
    collectRewards: (missionId: string) => void;
};

export function MissionProgressionModal({
    abandonMission,
    activeMission,
    collectRewards,
}: MissionProgressionModalProps) {
    const [now, setNow] = useState(Date.now());

    if (!activeMission) {
        return null;
    }

    const { startedAt, durationMs } = activeMission;

    const finishTime = startedAt + durationMs;
    const remainingTime = Math.max(finishTime - now, 0);
    const isCompleted = now >= finishTime;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const handleAbandonBtn = () => {
        abandonMission();
    };

    const handleRewardsBtn = (missionId: string) => {
        collectRewards(missionId);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.missionModalWrapper}>
                <section className={styles.missionCard}>
                    <h1 className={styles.header}>Mission progress</h1>
                    <h2 className={styles.rewardsHeader}>Rewards:</h2>
                    <ul className={styles.rewardsList}>
                        <li>XP:{activeMission.rewards.xp}</li>
                        <li>Gold:{activeMission.rewards.gold}</li>
                        {activeMission.rewards.equipment && (
                            <li>Items:{activeMission.rewards.equipment}</li>
                        )}
                        {activeMission.rewards.materials && (
                            <li>Materials:{activeMission.rewards.materials}</li>
                        )}
                        {activeMission.rewards.consumable && (
                            <li>Potions:{activeMission.rewards.consumable}</li>
                        )}
                    </ul>
                    {isCompleted ? (
                        <p className={styles.progress}>Mission Completed!</p>
                    ) : (
                        <p className={styles.progress}>
                            Time remaining: {formatTime(remainingTime)}{" "}
                        </p>
                    )}

                    {isCompleted ? (
                        <button
                            className={styles.rewardModalBtn}
                            onClick={() => handleRewardsBtn(activeMission.missionId)}
                        >
                            Collect rewards
                        </button>
                    ) : (
                        <button className={styles.rewardModalBtn} onClick={handleAbandonBtn}>
                            Abandon mission
                        </button>
                    )}
                </section>
            </div>
        </div>
    );
}
