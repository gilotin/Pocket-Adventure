import { useEffect, useState, type Dispatch, type JSX, type SetStateAction } from "react";
import { GameNavigation } from "./navigation/GameNavigation";
import styles from "./PocketAdventurePage.module.css";
import { Crafting } from "./features/crafting/Crafting";
import { Inventory } from "./features/inventory/Inventory";
import { Garden } from "./features/crafting/garden/Garden";
import { Missions } from "./features/missions/Missions";
import { Shop } from "./features/shop/Shop";
import { STORAGE_KEY } from "./MockedData/TestItemGenerator";
import { deleteItem, loadStorageData, saveItems } from "./services/storageOperations";
import { DetailsCard } from "./components/detailsCard/DetailsCard";
import { CharacterPanelAndStats } from "./features/character/CharacterPanelAndStats";
import { CHARACTER_KEY } from "./auth/register/Register";
import type { Character, GameMenuState, ItemStore } from "./types/gameTypes";
import { calculateCharacterStats } from "./systems/stats/calculateCharacterStats";
import { CalculateCharacterXp } from "./systems/stats/characterExperienceSystem";

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
    const [gameNavigation, setGameNavigation] = useState<GameMenuState>("inventory");
    const [inventoryItems, setInventoryItems] = useState<ItemStore>([]);
    const [showDetailsCard, setShowDetailsCard] = useState<boolean>(false);
    const [activeItemId, setActiveItemId] = useState<number | null>(null);
    const [characterData, setCharacterData] = useState<Character | null>(null);

    useEffect(() => {
        const loadedInventoryData = loadStorageData(STORAGE_KEY);
        setInventoryItems(Array.isArray(loadedInventoryData) ? loadedInventoryData : []);

        const loadCharacterData = loadStorageData(CHARACTER_KEY);

        if (!loadCharacterData) {
            const fallBackCharacter = createFallbackCharacter();
            localStorage.setItem(CHARACTER_KEY, JSON.stringify(fallBackCharacter));
            setCharacterData(fallBackCharacter);
            return;
        }

        setCharacterData(loadCharacterData);
    }, []);

    if (!characterData) return null;

    const activeItem = inventoryItems.find((item) => item.itemId === activeItemId) ?? null;

    const handleDeleteItem = (itemId: number) => {
        deleteItem(STORAGE_KEY, itemId);
        setInventoryItems(loadStorageData(STORAGE_KEY));

        setActiveItemId(null);
        setShowDetailsCard(false);
    };

    const handleActiveItemState = (itemId: number | null) => {
        if (itemId === null) {
            setActiveItemId(null);
            setShowDetailsCard(false);
            return;
        }
        setActiveItemId(itemId);
        setShowDetailsCard(true);
    };

    const sellItems = (itemId: number) => {
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
    console.log(characterProgress);

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
        missions: <Missions />,
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

    return (
        <>
            <GameNavigation setGameNavigation={setGameNavigation} gameNavigation={gameNavigation} />

            <section className={styles.gamePanelSection}>
                {gameNavigation && featureMap[gameNavigation]}
            </section>
            {showDetailsCard && <DetailsCard activeItem={activeItem} />}
        </>
    );
}
