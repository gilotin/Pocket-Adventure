import styles from "./CharacterPanelAndStats.module.css";
import type { Character, Item } from "../../types/gameTypes";

type CharacterPanelAndStatsProps = {
    characterData: Character;
    inventoryItems: Item[];
    unequipItem: () => void;
    handleActiveItemState: (itemId: number | null) => void;
};

export function CharacterPanelAndStats({
    characterData,
    inventoryItems,
    unequipItem,
    handleActiveItemState,
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
                    {item.equipmentSlot}:{item.name}
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
                <p>Magic:100</p>
                <p>Defense: 100</p>3<p>Offense: 120</p>
            </div>
        </section>
    );
}
