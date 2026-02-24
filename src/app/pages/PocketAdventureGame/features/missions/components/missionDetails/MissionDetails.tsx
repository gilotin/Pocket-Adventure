import type { Mission } from "../../../../types/gameTypes";
import { MissionRequirements } from "./MissionRequirements";
import styles from "./MissionDetails.module.css";
import { MissionRewards } from "./MissionRewards";

export type MissionDetailsProps = {
    currentMission: Mission;
};

export function MissionDetails({ currentMission }: MissionDetailsProps) {
    return (
        <>
            {currentMission && (
                <article>
                    <div>
                        <h2>{currentMission.title}</h2>
                        <img src="#" alt="quest picture" />
                        {currentMission?.description}
                        <MissionRequirements currentMission={currentMission} />
                        <MissionRewards currentMission={currentMission} />
                    </div>
                    <button onClick={() => console.log("started")}>start</button>
                </article>
            )}
        </>
    );
}
