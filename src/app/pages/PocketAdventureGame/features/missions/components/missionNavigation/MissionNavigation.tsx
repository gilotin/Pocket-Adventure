import { useState } from "react";
import { missionData } from "../../data/missionsData";
import styles from "./MissionNavigation.module.css";

type MissionNavigationProps = {
    setMissionNavigation: (menu: MissionNavigation) => void;
    missionNavigation: MissionNavigation;
};
type MissionNavigation = "story" | "quests" | "expeditions" | null;

type Mission = {
    id: string;
    type: "quests" | "story" | "expeditions";
    duration: number;
    title: string;
    levelReq: number;
    description: string;
    rewards: MissionReward;
};
type MissionReward = {
    xp: number;
    gold: number;
    materials?: string[];
    items?: ItemRewards;
    potions?: number;
};
type ItemRewards = ("armor" | "helm" | "gloves" | "boots")[];

export function MissionTypeNavigation({
    setMissionNavigation: setMissionTypeNavigation,
    missionNavigation: missionTypeNavigation,
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
        .map((mission) => {
            return (
                <li key={mission.id}>
                    <button
                        className={styles.missionListBtn}
                        onClick={() => onClickMissionHandler(mission)}
                    >
                        {mission.title}
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
                <article>
                    <div>
                        <img src="#" alt="quest picture" />
                        {currentMission?.description}
                        <div>
                            <p>Rewards:</p>
                            <p>Xp:{currentMission?.rewards.xp}</p>
                            <p>Gold:{currentMission?.rewards.gold}</p>
                            {currentMission.rewards.materials && (
                                <p>Materials:{currentMission.rewards.materials}</p>
                            )}
                            {currentMission.rewards.items && (
                                <p>Items:{currentMission.rewards.items}</p>
                            )}
                        </div>
                    </div>
                    <button onClick={() => console.log("started")}>start</button>
                </article>
            )}
        </div>
    );
}
