import { useEffect, useState } from "react";
import type { ActiveMission } from "../../../types/gameTypes";
import styles from "./MissionProgressionModal.module.css";
import { formatTime } from "../../../../../../utils/formatTime";

type MissionProgressionModalProps = {
    abandonMission: () => void;
    activeMission: ActiveMission;
};

export function MissionProgressionModal({
    abandonMission,
    activeMission,
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

    return (
        <section className={styles.missionModalWrapper}>
            <h1>Mission progress</h1>

            {isCompleted ? (
                <p>Mission Completed!</p>
            ) : (
                <p>Time remaining: {formatTime(remainingTime)} </p>
            )}

            {isCompleted ? (
                <button>Collect rewards</button>
            ) : (
                <button onClick={handleAbandonBtn}>Abandon mission</button>
            )}
        </section>
    );
}
