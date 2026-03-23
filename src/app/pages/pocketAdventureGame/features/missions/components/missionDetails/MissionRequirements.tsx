import type { Mission } from "../../../../types/gameTypes";

type MissionRequirements = {
    currentMission: Mission;
};

export function MissionRequirements({ currentMission }: MissionRequirements) {
    if (!currentMission) {
        return null;
    }
    const requirementsList = [
        { label: "level", value: currentMission.requirements?.level },
        { label: "Attack", value: currentMission.requirements?.attack },
        { label: "Armor", value: currentMission.requirements?.armor },
        { label: "Ele. protection", value: currentMission.requirements?.elementalProtection },
    ];

    const filteredList = requirementsList.filter((req) => req.value !== undefined);

    return (
        <>
            {currentMission.requirements && (
                <div>
                    <h3>Requirements:</h3>
                    <ul>
                        {filteredList.map((req) => {
                            return (
                                <li key={req.label}>
                                    {req.label}:{req.value}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
}
