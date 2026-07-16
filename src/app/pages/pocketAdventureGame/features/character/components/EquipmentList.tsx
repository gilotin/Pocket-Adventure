import type { Item } from "../../../types/gameTypes";
import styles from "../CharacterPanelAndStats.module.css";

type EquipmentProps = {
    selectActiveItem: (itemId: string | null) => void;
    unequipItem: () => void;
    equippedItems: Item[];
};

export function EquipmentList({ selectActiveItem, equippedItems, unequipItem }: EquipmentProps) {
    const handleMouseEnter = (itemId: string) => {
        selectActiveItem(itemId);
    };

    const handleMouseLeave = () => {
        selectActiveItem(null);
    };

    const equippedItemsBySlot = equippedItems.map((item) => {
        // this is placeholder will be changed with ItemCard
        return (
            <li
                key={item.itemId}
                onMouseEnter={() => handleMouseEnter(item.itemId)}
                onMouseLeave={handleMouseLeave}
            >
                <p>
                    {item?.equipmentSlot}:{item.name}
                </p>
                <button onClick={unequipItem}>Unequip</button>
            </li>
        );
    });

    return (
        <section className={styles.equipment}>
            <img
                className={styles.characterImage}
                src="assets/character.png"
                alt="character image"
            />
            <ul className={styles.equipmentList}>{equippedItemsBySlot}</ul>
        </section>
    );
}
