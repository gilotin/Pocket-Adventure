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
        <article>
            <div>
                <h2>{currentMission.title}</h2>
                <img src="#" alt="quest picture" />
                {currentMission.description}
                <MissionRequirements currentMission={currentMission} />
                <MissionRewards currentMission={currentMission} />
            </div>
            <button onClick={handleStartMissionButton}>start</button>
        </article>
    );
}
