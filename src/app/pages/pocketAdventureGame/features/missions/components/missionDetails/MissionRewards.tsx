import type { Mission } from "../../../../types/gameTypes";

type MissionRewardsProps = {
    currentMission: Mission;
};

export function MissionRewards({ currentMission }: MissionRewardsProps) {
    if (!currentMission) {
        return null;
    }

    // rewardList CAN BE USED IN MISSION PROGRESSION, SO LATTER CAN BE REFACTORED AS A FUNCTION !!!
    const rewardList = [
        { label: "Xp", value: currentMission.rewards.xp },
        { label: "Gold", value: currentMission.rewards.gold },
        { label: "Materials", value: currentMission.rewards.materials },
        { label: "Consumable", value: currentMission.rewards.consumable },
        { label: "Equipment", value: currentMission.rewards.equipment },
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
