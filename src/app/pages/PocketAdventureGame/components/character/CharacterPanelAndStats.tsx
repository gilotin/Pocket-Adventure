import styles from "./CharacterPanelAndStats.module.css";
import type { Character, Item, ItemStats } from "../../types/gameTypes";

type CharacterPanelAndStatsProps = {
    characterData: Character;
    inventoryItems: Item[];
    unequipItem: () => void;
    handleActiveItemState: (itemId: number | null) => void;
    calculatedEquipmentStats: ItemStats;
};

export function CharacterPanelAndStats({
    characterData,
    inventoryItems,
    unequipItem,
    handleActiveItemState,
    calculatedEquipmentStats,
}: CharacterPanelAndStatsProps) {
    const handleMouseEnter = (itemId: number) => {
        handleActiveItemState(itemId);
    };

    const handleMouseLeave = () => {
        handleActiveItemState(null);
    };

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
                <p>XP:{characterData?.experience}xp</p>
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
