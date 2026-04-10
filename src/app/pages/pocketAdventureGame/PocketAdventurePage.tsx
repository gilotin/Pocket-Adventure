import { useEffect, useState, type Dispatch, type JSX, type SetStateAction } from "react";
import { GameNavigation } from "./navigation/GameNavigation";
import styles from "./PocketAdventurePage.module.css";
import { Crafting } from "./features/crafting/Crafting";
import { Inventory } from "./features/inventory/Inventory";
import { Garden } from "./features/crafting/garden/Garden";
import { Missions } from "./features/missions/Missions";
import { Shop } from "./features/shop/Shop";

import { CHARACTER_KEY } from "./auth/register/Register";
import { deleteItem, loadStorageData, saveItems } from "./services/storageOperations";
import { DetailsCard } from "./components/detailsCard/DetailsCard";
import { CharacterPanelAndStats } from "./features/character/CharacterPanelAndStats";
import type { ActiveMission, Character, GameMenuState, ItemStore } from "./types/gameTypes";
import { calculateCharacterStats } from "./systems/stats/calculateCharacterStats";
import { CalculateCharacterXp } from "./systems/stats/characterExperienceSystem";
import { missionData } from "./features/missions/data/missionsData";
import { MissionProgressionModal } from "./features/missions/missionProgressionModal/MissionProgressionModal";
import { MISSION_KEY, STORAGE_KEY } from "./constants/gameConstants";
import { generateMoreItems } from "./systems/items/generateItems";
import { useInventory } from "./features/inventory/hooks/useInvenotry";

type GameMenuStateKey = Exclude<GameMenuState, null>;

type GamePageProps = {
    setConfirmAction: Dispatch<SetStateAction<(() => void) | null>>;
};

export function createFallbackCharacter(): Character {
    return {
        name: "Adventurer",
        gold: 100,
        totalExperience: 0,
    };
}

//  TO GENERATE BASES RANDOMLY !!! NEED UPDATE

export function PocketAdventurePage({ setConfirmAction }: GamePageProps) {
    const [gameNavigation, setGameNavigation] = useState<GameMenuState>("character");
    const [characterData, setCharacterData] = useState<Character | null>(null);
    const [activeMission, setActiveMission] = useState<ActiveMission>(null);
    const {
        inventoryItems,
        activeItem,
        showDetailsCard,
        deleteItemById,
        selectItem,
        sellItem,
        setInventoryItems,
        equipItem,
        unequipItem,
    } = useInventory();

    useEffect(() => {
        const loadedInventoryData = loadStorageData<ItemStore | []>(STORAGE_KEY, []);
        setInventoryItems(Array.isArray(loadedInventoryData) ? loadedInventoryData : []);

        const storedCharacterData = loadStorageData<Character | null>(CHARACTER_KEY, null);

        const storedMission = loadStorageData<ActiveMission | null>(MISSION_KEY, null);

        if (!storedCharacterData) {
            const fallBackCharacter = createFallbackCharacter();
            localStorage.setItem(CHARACTER_KEY, JSON.stringify(fallBackCharacter));
            setCharacterData(fallBackCharacter);
        } else {
            setCharacterData(storedCharacterData);
        }

        if (!storedMission) {
            setActiveMission(null);
        } else {
            setActiveMission(storedMission);
        }
    }, []);

    if (!characterData) return null;

    //   to pass sellItem to character !!!

    // const equipSelectedItem = () => {
    //     if (!activeItemId) return;
    //     if (activeItem?.type !== "equipment") return;
    //     if (!activeItem.equipmentSlot) return;

    //     const equipmentType = activeItem.equipmentSlot;

    //     const updatedInventory = inventoryItems.map((item) => {
    //         let updatedItem = item;

    //         if (item.equipmentSlot === equipmentType && item.isEquipped) {
    //             updatedItem = { ...item, isEquipped: false };
    //         }

    //         if (item.itemId === activeItemId) {
    //             updatedItem = { ...item, isEquipped: true };
    //         }

    //         return updatedItem;
    //     });

    //     setInventoryItems(updatedInventory);
    //     saveItems(STORAGE_KEY, updatedInventory);
    //     setShowDetailsCard(false);
    // };

    // const unequipSelectedItem = () => {
    //     if (!activeItemId) return;
    //     if (activeItem?.type !== "equipment") return;
    //     if (!activeItem.equipmentSlot) return;

    //     const updatedInventory = inventoryItems.map((item) => {
    //         if (item.itemId === activeItemId) {
    //             return { ...item, isEquipped: false };
    //         }
    //         return item;
    //     });

    //     setInventoryItems(updatedInventory);
    //     saveItems(STORAGE_KEY, updatedInventory);
    //     setShowDetailsCard(false);
    // };

    const calculatedEquipmentStats = calculateCharacterStats({ inventoryItems });

    const characterProgress = CalculateCharacterXp({ characterData });

    /*
    =================
    MISSIONS
    =================
    */

    function mergeInventory(prevInventory: ItemStore, newItems: ItemStore): ItemStore {
        const updatedInventory = [...prevInventory];

        newItems.forEach((newItem) => {
            const existingItem = updatedInventory.find(
                (item) => item.name === newItem.name && item.type === newItem.type,
            );

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                updatedInventory.push({ ...newItem });
            }
        });

        return updatedInventory;
    }

    const characterXpProgress = CalculateCharacterXp({ characterData });

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

        setInventoryItems((prev) => {
            const update = mergeInventory(prev, itemRewardsList);

            localStorage.setItem(STORAGE_KEY, JSON.stringify(update));

            return update;
        });

        setCharacterData((prev) => {
            if (!prev) {
                return prev;
            } else {
                const updated = {
                    ...prev,
                    gold: prev.gold + missionDefinition.rewards.gold,
                    totalExperience: prev.totalExperience + missionDefinition.rewards.xp,
                };

                localStorage.setItem(CHARACTER_KEY, JSON.stringify(updated));
                localStorage.removeItem(MISSION_KEY);
                return updated;
            }
        });

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
                onSellItem={sellItem}
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
                unequipItem={unequipSelectedItem}
                calculatedEquipmentStats={calculatedEquipmentStats}
                characterProgress={characterProgress}
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
