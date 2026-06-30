import styles from "./MissionDetails.module.css";
import type { Mission } from "../../../../types/gameTypes";
import { MissionRequirements } from "./MissionRequirements";
import { MissionRewards } from "./MissionRewards";

type MissionDetailsProps = {
    currentMission: Mission;
    startMission: (missionId: string) => void;
};

export function MissionDetails({ currentMission, startMission }: MissionDetailsProps) {
    const handleStartMissionButton = () => {
        startMission(currentMission.id);
    };

    return (
        <article className={styles.detailsCardWrapper}>
            <div className={styles.detailsCard}>
                <h1 className={styles.header}>{currentMission.title}</h1>
                <div className={styles.decorativeLine}></div>
                <div className={styles.description}>{currentMission.description}</div>
                <MissionRequirements currentMission={currentMission} />
                <MissionRewards currentMission={currentMission} />
            </div>
            <button className={styles.missionStartBtn} onClick={handleStartMissionButton}>
                start
            </button>
        </article>
    );
}
