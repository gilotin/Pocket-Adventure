import { useEffect, useState, type Dispatch, type JSX, type SetStateAction } from "react";
import { GameNavigation } from "./navigation/GameNavigation";
import styles from "./PocketAdventurePage.module.css";
import { Crafting } from "./features/crafting/Crafting";
import { Inventory } from "./features/inventory/Inventory";
import { Garden } from "./features/crafting/garden/Garden";
import { Missions } from "./features/missions/Missions";
import { Shop } from "./features/shop/Shop";

import { CHARACTER_KEY } from "./auth/register/Register";
import { loadStorageData } from "./services/storageOperations";
import { DetailsCard } from "./components/detailsCard/DetailsCard";
import { CharacterPanelAndStats } from "./features/character/CharacterPanelAndStats";
import type { ActiveMission, Character, GameMenuState, ItemStore } from "./types/gameTypes";
import { calculateCharacterStats } from "./systems/stats/calculateCharacterStats";
import { CalculateCharacterXp } from "./systems/stats/characterExperienceSystem";
import { missionData } from "./features/missions/data/missionsData";
import { MissionProgressionModal } from "./features/missions/missionProgressionModal/MissionProgressionModal";
import { MISSION_KEY, STORAGE_KEY } from "./constants/gameConstants";
import { generateMoreItems } from "./systems/items/generateItems";
import { useInventory } from "./features/inventory/hooks/useInventory";
import { useCharacter } from "./features/character/hooks/useCharacter";

type GameMenuStateKey = Exclude<GameMenuState, null>;

type GamePageProps = {
    setConfirmAction: Dispatch<SetStateAction<(() => void) | null>>;
};

//  TO GENERATE BASES RANDOMLY !!! NEED UPDATE

export function PocketAdventurePage({ setConfirmAction }: GamePageProps) {
    const [gameNavigation, setGameNavigation] = useState<GameMenuState>("character");
    const [activeMission, setActiveMission] = useState<ActiveMission>(null);
    const { characterData, addGold, addExperience } = useCharacter();
    const {
        inventoryItems,
        activeItem,
        showDetailsCard,
        deleteItemById,
        selectItem,
        sellItem,
        equipItem,
        unequipItem,
        addItems,
    } = useInventory();

    useEffect(() => {
        const storedMission = loadStorageData<ActiveMission | null>(MISSION_KEY, null);

        if (!storedMission) {
            setActiveMission(null);
        } else {
            setActiveMission(storedMission);
        }
    }, []);

    const calculatedEquipmentStats = calculateCharacterStats({ inventoryItems });

    const characterXpProgress = CalculateCharacterXp({ characterData });

    const onSellItem = (itemId: string) => {
        const itemValue = sellItem(itemId);
        addGold(itemValue);
    };

    /*
    =================
    MISSIONS
    =================
    */

    const startMission = (missionId: string) => {
        if (activeMission) {
            return;
        }
        const missionDefinition = missionData.find((mission) => mission.id === missionId);

        if (!missionDefinition) {
            return;
        }

        const missionStartTime = Date.now();
        const durationSeconds = missionDefinition.duration;
        const missionRewards = missionDefinition.rewards;

        const currentActiveMissionData: ActiveMission = {
            missionId: missionId,
            rewards: missionRewards,
            startedAt: missionStartTime,
            durationMs: durationSeconds * 1000,
        };

        localStorage.setItem(MISSION_KEY, JSON.stringify(currentActiveMissionData));
        setActiveMission(currentActiveMissionData);
    };

    const abandonMission = () => {
        localStorage.removeItem(MISSION_KEY);
        setActiveMission(null);
    };

    const collectRewards = (missionId: string) => {
        const missionDefinition = missionData.find((mission) => mission.id === missionId);
        if (!missionDefinition) {
            return;
        }

        let itemRewardsList: ItemStore = [];

        for (const reward in missionDefinition.rewards) {
            if (reward === "materials" || reward === "consumable" || reward === "equipment") {
                const rewardName = reward;
                let rewardQuantity = missionDefinition.rewards[reward];

                if (rewardQuantity === undefined) {
                    continue;
                }
                const itemReward = generateMoreItems(rewardQuantity, {
                    characterLevel: characterXpProgress.level,
                    itemType: rewardName,
                });

                itemRewardsList.push(...itemReward);
            }
        }

        addItems(itemRewardsList);
        addGold(missionDefinition.rewards.gold);
        addExperience(missionDefinition.rewards.xp);

        setGameNavigation("character");
        setActiveMission(null);
    };

    const featureMap: Record<GameMenuStateKey, JSX.Element> = {
        crafting: <Crafting />,
        inventory: (
            <Inventory
                inventoryItems={inventoryItems}
                onDeleteItem={deleteItemById}
                selectActiveItem={selectItem}
                onSellItem={onSellItem}
                setConfirmAction={setConfirmAction}
                equipItem={equipItem}
                unequipItem={unequipItem}
            />
        ),
        missions: <Missions startMission={startMission} />,
        garden: <Garden />,
        shop: <Shop />,
        character: (
            <CharacterPanelAndStats
                characterData={characterData}
                inventoryItems={inventoryItems}
                selectActiveItem={selectItem}
                unequipItem={unequipItem}
                calculatedEquipmentStats={calculatedEquipmentStats}
                characterProgress={characterXpProgress}
            />
        ),
    };

    return (
        <>
            <GameNavigation setGameNavigation={setGameNavigation} gameNavigation={gameNavigation} />

            <div className={styles.gamePanelWrapper}>
                <h1 className={styles.header}>{gameNavigation}</h1>
                {gameNavigation && featureMap[gameNavigation]}
            </div>
            {showDetailsCard && <DetailsCard activeItem={activeItem} />}
            {activeMission && (
                <MissionProgressionModal
                    abandonMission={abandonMission}
                    activeMission={activeMission}
                    collectRewards={collectRewards}
                />
            )}
        </>
    );
}
