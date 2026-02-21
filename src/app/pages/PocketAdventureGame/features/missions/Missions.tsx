import styles from "./Missions.module.css";
import { useState } from "react";
import { MissionTypeNavigation } from "./components/missionNavigation/MissionNavigation";

type MissionNavigation = "story" | "quests" | "expeditions" | null;

export function Missions() {
    const [missionNavigation, setMissionNavigation] = useState<MissionNavigation>(null);

    return (
        <section className={styles.missionWrapper}>
            <MissionTypeNavigation
                missionNavigation={missionNavigation}
                setMissionNavigation={setMissionNavigation}
            />
        </section>
    );
}
