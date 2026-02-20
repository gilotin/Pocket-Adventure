type MissionNavigationProps = {
    setMissionNavigation: (menu: MissionNavigation) => void;
};
type MissionNavigation = "story" | "quests" | "expeditions";

export function MissionNavigation({ setMissionNavigation }: MissionNavigationProps) {
    const missionNavigationHandler = (menu: MissionNavigation) => {
        return setMissionNavigation(menu);
    };

    const missionList: { label: string; value: MissionNavigation }[] = [
        { label: "Story", value: "story" },
        { label: "Quests", value: "quests" },
        { label: "Expeditions", value: "expeditions" },
    ];

    const missionNavigationMenu = missionList.map((button, index) => {
        return (
            <button key={index} onClick={() => missionNavigationHandler(button.value)}>
                {button.label}
            </button>
        );
    });

    return <>{missionNavigationMenu}</>;
}
