import type { MissionDetailsProps } from "./MissionDetails";

export function MissionRewards({ currentMission }: MissionDetailsProps) {
    if (!currentMission) {
        return null;
    }

    const rewardList = [
        { label: "Xp", value: currentMission.rewards.xp },
        { label: "Gold", value: currentMission.rewards.gold },
        { label: "Materials", value: currentMission.rewards.materials },
        { label: "Items", value: currentMission.rewards.items },
        { label: "Potions", value: currentMission.rewards.potions },
    ];

    const filteredList = rewardList.filter((req) => req.value !== undefined);

    return (
        <>
            {currentMission.rewards && (
                <div>
                    <h3>Rewards:</h3>
                    <ul>
                        {filteredList.map((reward) => {
                            return (
                                <li key={reward.label}>
                                    {reward.label}: {reward.value}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
}
