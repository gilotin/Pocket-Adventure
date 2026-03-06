import styles from "./Missions.module.css";
import { useState } from "react";
import { MissionTypeNavigation } from "./components/missionNavigation/MissionNavigation";

type MissionProps = {
    startMission: (missionId: string) => void;
};
type MissionNavigation = "story" | "quests" | "expeditions" | null;

export function Missions({ startMission }: MissionProps) {
    const [missionNavigation, setMissionNavigation] = useState<MissionNavigation>(null);

    return (
        <section className={styles.missionWrapper}>
            <MissionTypeNavigation
                startMission={startMission}
                missionTypeNavigation={missionNavigation}
                setMissionTypeNavigation={setMissionNavigation}
            />
        </section>
    );
}
