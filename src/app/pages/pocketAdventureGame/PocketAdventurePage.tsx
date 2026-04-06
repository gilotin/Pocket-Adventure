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
import { generateItem } from "./systems/items/generateItems";

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

export function PocketAdventurePage({ setConfirmAction }: GamePageProps) {
    const [gameNavigation, setGameNavigation] = useState<GameMenuState>("character");
    const [inventoryItems, setInventoryItems] = useState<ItemStore>([]);
    const [showDetailsCard, setShowDetailsCard] = useState<boolean>(false);
    const [activeItemId, setActiveItemId] = useState<string | null>(null);
    const [characterData, setCharacterData] = useState<Character | null>(null);
    const [activeMission, setActiveMission] = useState<ActiveMission>(null);

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

    const activeItem = inventoryItems.find((item) => item.itemId === activeItemId) ?? null;

    const handleDeleteItem = (itemId: string) => {
        deleteItem(STORAGE_KEY, itemId);
        setInventoryItems(loadStorageData(STORAGE_KEY, []));

        setActiveItemId(null);
        setShowDetailsCard(false);
    };

    const handleActiveItemState = (itemId: string | null) => {
        if (itemId === null) {
            setActiveItemId(null);
            setShowDetailsCard(false);
            return;
        }
        setActiveItemId(itemId);
        setShowDetailsCard(true);
    };

    const sellItems = (itemId: string) => {
        const itemForSell = inventoryItems.find((item) => item.itemId === itemId);
        if (!itemForSell) return;
        const itemPrice = itemForSell.itemValue;
        setCharacterData((prev) => {
            if (!prev) {
                return prev;
            } else {
                const updated = { ...prev, gold: prev.gold + itemPrice };
                localStorage.setItem(CHARACTER_KEY, JSON.stringify(updated));
                return updated;
            }
        });
        handleDeleteItem(itemId);
    };

    const equipSelectedItem = () => {
        if (!activeItemId) return;
        if (activeItem?.type !== "equipment") return;
        if (!activeItem.equipmentSlot) return;

        const equipmentType = activeItem.equipmentSlot;

        const updatedInventory = inventoryItems.map((item) => {
            let updatedItem = item;

            if (item.equipmentSlot === equipmentType && item.isEquipped) {
                updatedItem = { ...item, isEquipped: false };
            }

            if (item.itemId === activeItemId) {
                updatedItem = { ...item, isEquipped: true };
            }

            return updatedItem;
        });

        setInventoryItems(updatedInventory);
        saveItems(STORAGE_KEY, updatedInventory);
        setShowDetailsCard(false);
    };

    const unequipSelectedItem = () => {
        if (!activeItemId) return;
        if (activeItem?.type !== "equipment") return;
        if (!activeItem.equipmentSlot) return;

        const updatedInventory = inventoryItems.map((item) => {
            if (item.itemId === activeItemId) {
                return { ...item, isEquipped: false };
            }
            return item;
        });

        setInventoryItems(updatedInventory);
        saveItems(STORAGE_KEY, updatedInventory);
        setShowDetailsCard(false);
    };

    const calculatedEquipmentStats = calculateCharacterStats({ inventoryItems });

    const characterProgress = CalculateCharacterXp({ characterData });

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
                onDeleteItem={handleDeleteItem}
                handleActiveItemState={handleActiveItemState}
                handleSellItems={sellItems}
                setConfirmAction={setConfirmAction}
                equipItem={equipSelectedItem}
                unequipItem={unequipSelectedItem}
            />
        ),
        missions: <Missions startMission={startMission} />,
        garden: <Garden />,
        shop: <Shop />,
        character: (
            <CharacterPanelAndStats
                characterData={characterData}
                inventoryItems={inventoryItems}
                handleActiveItemState={handleActiveItemState}
                unequipItem={unequipSelectedItem}
                calculatedEquipmentStats={calculatedEquipmentStats}
                characterProgress={characterProgress}
            />
        ),
    };

    const characterXpProgress = CalculateCharacterXp({ characterData });

    const item = generateItem({
        characterLevel: characterXpProgress.level,
        itemType: "materials",
    });
    console.log(item);

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
