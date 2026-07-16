import styles from "./CharacterPanelAndStats.module.css";
import type { Character, Item, ItemStats } from "../../types/gameTypes";
import { CharacterCardInfo } from "./components/CharacterCardInfo";
import { EquipmentList } from "./components/EquipmentList";

type CharacterPanelAndStatsProps = {
    characterData: Character;
    inventoryItems: Item[];
    unequipItem: () => void;
    selectActiveItem: (itemId: string | null) => void;
    calculatedEquipmentStats: ItemStats;
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
    calculatedEquipmentStats,
    unequipItem,
    selectActiveItem,
    characterProgress,
}: CharacterPanelAndStatsProps) {
    const equippedItems = inventoryItems.filter((item) => item.isEquipped);
    return (
        <article className={styles.characterInfoCard}>
            <CharacterCardInfo
                calculatedStats={calculatedEquipmentStats}
                characterData={characterData}
                characterProgress={characterProgress}
            />
            <EquipmentList
                selectActiveItem={selectActiveItem}
                equippedItems={equippedItems}
                unequipItem={unequipItem}
            />
        </article>
    );
}
