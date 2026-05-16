/**
 * Main game orchestrator component.
 *
 * Coordinates core systems:
 * - useMission (mission lifecycle)
 * - useInventory (item management)
 * - useCharacter (character stats, gold, and XP)
 *
 * Handles user-driven actions such as:
 * - collecting mission rewards
 * - selling items
 *
 * This component does not manage or persist state directly.
 * All state and mutations are delegated to their respective hooks,
 * which act as the single source of truth.
 */

import { useEffect, useState, type Dispatch, type JSX, type SetStateAction } from "react";
import { GameNavigation } from "./navigation/GameNavigation";
import styles from "./PocketAdventurePage.module.css";
import { Crafting } from "./features/crafting/Crafting";
import { Inventory } from "./features/inventory/Inventory";
import { Garden } from "./features/crafting/garden/Garden";
import { Missions } from "./features/missions/Missions";
import { Shop } from "./features/shop/Shop";
import { DetailsCard } from "./components/detailsCard/DetailsCard";
import { CharacterPanelAndStats } from "./features/character/CharacterPanelAndStats";
import type { GameMenuState, ItemStore } from "./types/gameTypes";
import { calculateCharacterStats } from "./systems/stats/calculateCharacterStats";
import { CalculateCharacterXp } from "./systems/stats/characterExperienceSystem";
import { MissionProgressionModal } from "./features/missions/missionProgressionModal/MissionProgressionModal";
import { generateMoreItems } from "./systems/items/generateItems";
import { useCharacter } from "./features/character/hooks/useCharacter";
import { useMission } from "./features/missions/hooks/useMission";
import { useShop } from "./features/shop/hooks/useShop";
import { generateRandomNumber } from "./systems/items/generateRandomNumber";
import { REFRESH_INTERVAL } from "./constants/gameConstants";
import { useInventory } from "./features/inventory/hooks/useInventory";

type GameMenuStateKey = Exclude<GameMenuState, null>;

type GamePageProps = {
    setConfirmAction: Dispatch<SetStateAction<(() => void) | null>>;
};

type RewardTypes = "materials" | "consumable" | "equipment";

export function PocketAdventurePage({ setConfirmAction }: GamePageProps) {
    const [gameNavigation, setGameNavigation] = useState<GameMenuState>("shop");
    const { activeMission, startMission, abandonMission, completeMission } = useMission();
    const { characterData, addGold, removeGold, checkGold, addExperience } = useCharacter();
    const {
        inventoryItems,
        activeItem,
        showDetailsCard,
        deleteItemById,
        selectItem,
        sellItem,
        addItems,
        addItem,
        equipItem,
        unequipItem,
    } = useInventory();
    const { shop, updateShop, removeItem, isLoaded } = useShop();

    const calculatedEquipmentStats = calculateCharacterStats({ inventoryItems });

    const characterXpProgress = CalculateCharacterXp({ characterData });

    useEffect(() => {
        if (gameNavigation === "shop" && isLoaded) {
            handleRefreshShop();
        }
    }, [gameNavigation, isLoaded]);

    /*======================================
                    INVENTORY
    ======================================*/

    const onSellItem = (itemId: string) => {
        const itemValue = sellItem(itemId);
        addGold(itemValue);
    };

    /*======================================
                    MISSION
    ======================================*/

    const collectRewards = () => {
        const completedMission = completeMission();
        if (!completedMission) return;

        const itemRewardsList: ItemStore = [];
        const typeList: RewardTypes[] = ["materials", "consumable", "equipment"];
        const missionRewards = completedMission.rewards;

        typeList.forEach((type) => {
            const quantity = missionRewards[type];
            if (quantity === undefined) return;
            const generatedReward = generateMoreItems(quantity, {
                characterLevel: characterXpProgress.level,
                itemType: type,
            });
            itemRewardsList.push(...generatedReward);
        });

        addItems(itemRewardsList);
        addGold(missionRewards.gold);
        addExperience(missionRewards.xp);

        setGameNavigation("character");
    };

    /*======================================
                    SHOP
    ======================================*/

    const handleRefreshShop = () => {
        const currentTime = Date.now();

        if (!shop.timer || currentTime > shop.timer) {
            const quantity = generateRandomNumber(1, 3);

            const newConsumables = generateMoreItems(quantity, {
                characterLevel: characterXpProgress.level,
                itemType: "consumable",
            });

            const newMaterials = generateMoreItems(quantity, {
                characterLevel: characterXpProgress.level,
                itemType: "materials",
            });

            const newShopList = [...newConsumables, ...newMaterials];

            const nextTimer = currentTime + REFRESH_INTERVAL;

            updateShop({ items: newShopList, timer: nextTimer });
        }
    };

    const onBuyItem = (itemId: string) => {
        const item = shop.items.find((item) => item.itemId === itemId);
        if (!item) return;

        if (!checkGold(item.itemValue)) {
            return; // Set Error
        }

        removeItem(item.itemId);

        removeGold(item.itemValue);

        addItem(item);
    };

    /*======================================
                IN-GAME NAVIGATION
    ======================================*/

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
        shop: <Shop shop={shop} onBuyItem={onBuyItem} />,
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
