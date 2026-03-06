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
        <section className={styles.missionModalWrapper}>
            <h1>Mission progress</h1>
            <h2>Rewards:</h2>
            <ul>
                <li>XP:{activeMission.rewards.xp}</li>
                <li>Gold:{activeMission.rewards.gold}</li>
                {activeMission.rewards.items && (
                    <li>Items:{activeMission.rewards.items.join(", ")}</li>
                )}
                {activeMission.rewards.materials && (
                    <li>Materials:{activeMission.rewards.materials}</li>
                )}
                {activeMission.rewards.potions && <li>Potions:{activeMission.rewards.potions}</li>}
            </ul>
            {isCompleted ? (
                <p>Mission Completed!</p>
            ) : (
                <p>Time remaining: {formatTime(remainingTime)} </p>
            )}

            {isCompleted ? (
                <button onClick={() => handleRewardsBtn(activeMission.missionId)}>
                    Collect rewards
                </button>
            ) : (
                <button onClick={handleAbandonBtn}>Abandon mission</button>
            )}
        </section>
    );
}
