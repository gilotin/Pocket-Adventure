import styles from "./CharacterPanelAndStats.module.css";
import type { Character, Item, ItemStats } from "../../types/gameTypes";

type CharacterPanelAndStatsProps = {
    characterData: Character;
    inventoryItems: Item[];
    unequipItem: () => void;
    handleActiveItemState: (itemId: number | null) => void;
    calculatedEquipmentStats: ItemStats;
    // NOTE: To fix that type and move it in types
    characterProgress: {
        level: number;
        xpIntoLevel: number;
        xpRequired: number;
        progressPercent: number;
    };
};

export function CharacterPanelAndStats({
    characterData,
    inventoryItems,
    unequipItem,
    handleActiveItemState,
    calculatedEquipmentStats,
    characterProgress,
}: CharacterPanelAndStatsProps) {
    const handleMouseEnter = (itemId: number) => {
        handleActiveItemState(itemId);
    };

    const handleMouseLeave = () => {
        handleActiveItemState(null);
    };

    console.log(characterProgress);

    const filteredEquippedItems = inventoryItems.filter((item) => item.isEquipped === true);
    const equippedItemsBySlot = filteredEquippedItems.map((item) => {
        // this is placeholder will be changed with ItemCard
        return (
            <div
                key={item.itemId}
                onMouseEnter={() => handleMouseEnter(item.itemId)}
                onMouseLeave={handleMouseLeave}
            >
                <p>
                    {item?.equipmentSlot}:{item.name}
                </p>
                <button onClick={unequipItem}>Unequip</button>
            </div>
        );
    });

    return (
        <section className={styles.wrapper}>
            <div>
                <h3>{characterData?.name}</h3>
                <p>level:{characterProgress?.level}</p>
                <p>CurrentXp: {characterData.totalExperience}</p>
                {/* NODE: LAVING IT AS IT IS BEFORE DECIDE WHAT TO TO WITH IT  */}
                {/* <p>XP:{characterData?.totalExperience}xp</p> */}
                <p>Gold:{characterData?.gold}</p>
                <div>
                    <p>Equipment:</p>
                    <div className="characterEquipment">{equippedItemsBySlot}</div>
                </div>
            </div>
            <div>
                <p>Stats:</p>
                <p>HP:100</p>
                <p>Attack:{calculatedEquipmentStats?.attack ?? "0"}</p>
                <p>Armor:{calculatedEquipmentStats?.armor ?? "0"}</p>
                <p>Ele. protection:{calculatedEquipmentStats?.elementalProtection ?? "0"}</p>
                <p>Recovery:{calculatedEquipmentStats?.recovery ?? "0"}</p>
                <p>Drop Chance:{calculatedEquipmentStats?.dropChance ?? "0"}</p>
            </div>
        </section>
    );
}
