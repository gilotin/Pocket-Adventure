import { useState } from "react";
import { missionData } from "../../data/missionsData";
import styles from "./MissionNavigation.module.css";
import type { ActiveMission, Mission } from "../../../../types/gameTypes";
import { MissionDetails } from "../missionDetails/MissionDetails";

type MissionNavigationProps = {
    setMissionTypeNavigation: (menu: MissionNavigation) => void;
    missionTypeNavigation: MissionNavigation;
    startMission: (missionId: string) => void;
};
type MissionNavigation = "story" | "quests" | "expeditions" | null;

export function MissionTypeNavigation({
    setMissionTypeNavigation,
    missionTypeNavigation,
    startMission,
}: MissionNavigationProps) {
    const [currentMission, setCurrentMission] = useState<Mission | null>(null);

    const missionTypeButtonList: { label: string; value: MissionNavigation }[] = [
        { label: "Story", value: "story" },
        { label: "Quests", value: "quests" },
        { label: "Expeditions", value: "expeditions" },
    ];

    const missionNavigationHandler = (menu: MissionNavigation) => {
        setMissionTypeNavigation(menu);
        setCurrentMission(null);
        return;
    };

    const missionTypeNavigationMenu = missionTypeButtonList.map((button) => {
        return (
            <button key={button.value} onClick={() => missionNavigationHandler(button.value)}>
                {button.label}
            </button>
        );
    });

    const filteredMissionList = missionData
        .filter((mission) => {
            return mission.type === missionTypeNavigation;
        })
        .map((mission, index) => {
            return (
                <li key={mission.id}>
                    <button
                        className={styles.missionListBtn}
                        onClick={() => onClickMissionHandler(mission)}
                    >
                        {mission.type}:{index + 1}
                    </button>
                </li>
            );
        });

    const onClickMissionHandler = (mission: Mission) => {
        setCurrentMission(mission);
    };

    return (
        <div className={styles.missionWrapper}>
            <div className={styles.menuSelect}>{missionTypeNavigationMenu}</div>
            <ul className={styles.menuList}>{filteredMissionList}</ul>

            {currentMission && (
                <MissionDetails startMission={startMission} currentMission={currentMission} />
            )}
        </div>
    );
}
