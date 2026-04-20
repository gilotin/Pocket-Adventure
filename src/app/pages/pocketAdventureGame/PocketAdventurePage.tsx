import { useState, type Dispatch, type JSX, type SetStateAction } from "react";
import { GameNavigation } from "./navigation/GameNavigation";
import styles from "./PocketAdventurePage.module.css";
import { Crafting } from "./features/crafting/Crafting";
import { Inventory } from "./features/inventory/Inventory";
import { Garden } from "./features/crafting/garden/Garden";
import { Missions } from "./features/missions/Missions";
import { Shop } from "./features/shop/Shop";
import { DetailsCard } from "./components/detailsCard/DetailsCard";
import { CharacterPanelAndStats } from "./features/character/CharacterPanelAndStats";
import type { GameMenuState, ItemStore, ItemType } from "./types/gameTypes";
import { calculateCharacterStats } from "./systems/stats/calculateCharacterStats";
import { CalculateCharacterXp } from "./systems/stats/characterExperienceSystem";
import { MissionProgressionModal } from "./features/missions/missionProgressionModal/MissionProgressionModal";
import { generateMoreItems } from "./systems/items/generateItems";
import { useInventory } from "./features/inventory/hooks/useInventory";
import { useCharacter } from "./features/character/hooks/useCharacter";
import { useMission } from "./features/missions/hooks/useMission";

type GameMenuStateKey = Exclude<GameMenuState, null>;

type GamePageProps = {
    setConfirmAction: Dispatch<SetStateAction<(() => void) | null>>;
};

type RewardTypes = "materials" | "consumable" | "equipment";

export function PocketAdventurePage({ setConfirmAction }: GamePageProps) {
    const [gameNavigation, setGameNavigation] = useState<GameMenuState>("character");
    const { activeMission, startMission, abandonMission, completeMission } = useMission();
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

    const calculatedEquipmentStats = calculateCharacterStats({ inventoryItems });

    const characterXpProgress = CalculateCharacterXp({ characterData });

    const onSellItem = (itemId: string) => {
        const itemValue = sellItem(itemId);
        addGold(itemValue);
    };

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
