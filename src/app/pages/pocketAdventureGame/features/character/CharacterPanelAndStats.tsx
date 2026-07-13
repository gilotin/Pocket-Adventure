import styles from "./CharacterPanelAndStats.module.css";
import type { Character, Item, ItemStats } from "../../types/gameTypes";

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
    unequipItem,
    selectActiveItem,
    calculatedEquipmentStats,
    characterProgress,
}: CharacterPanelAndStatsProps) {
    const handleMouseEnter = (itemId: string) => {
        selectActiveItem(itemId);
    };

    const handleMouseLeave = () => {
        selectActiveItem(null);
    };

    const filteredEquippedItems = inventoryItems.filter((item) => item.isEquipped === true);
    const equippedItemsBySlot = filteredEquippedItems.map((item) => {
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
        <article className={styles.wrapper}>
            <section className={styles.statsCard}>
                {/* <h2 className={styles.header}>Stats</h2> */}
                <div className={styles.characterInfoPanel}>
                    <div className="imageBorder">
                        <img src="#" alt="#" />
                    </div>
                    <div className={styles.characterInfoStats}>
                        <span>{characterData.name}</span>
                        <span>Level:{characterProgress.level}</span>
                        <span>XP:{characterData.totalExperience}</span>
                        {/* this is placeholder */}
                    </div>
                </div>
                <div className={styles.characterStats}>
                    <ul className={styles.statsList}>
                        <li className={styles.statParameter}>
                            <img src="#" alt="" className={styles.statIcon} />
                            <p className={styles.statName}>Some stat: 100</p>
                        </li>
                        <li className={styles.statParameter}>
                            <img src="#" alt="" className={styles.statIcon} />
                            <p className={styles.statName}>Some stat: 100</p>
                        </li>
                        <li className={styles.statParameter}>
                            <img src="#" alt="" className={styles.statIcon} />
                            <p className={styles.statName}>Some stat: 100</p>
                        </li>
                        <li className={styles.statParameter}>
                            <img src="#" alt="" className={styles.statIcon} />
                            <p className={styles.statName}>Some stat: 100</p>
                        </li>
                        <li className={styles.statParameter}>
                            <img src="#" alt="" className={styles.statIcon} />
                            <p className={styles.statName}>Some stat: 100</p>
                        </li>
                    </ul>
                </div>
                <div>gold: {characterData.gold}</div>
            </section>
            <section className={styles.equipment}>
                <ul className={styles.equipmentList}>{equippedItemsBySlot}</ul>
            </section>
        </article>
    );

    // return (
    //     <section className={styles.wrapper}>
    //         <div>
    //             <h3>{characterData?.name}</h3>
    //             <p>level:{characterProgress?.level}</p>
    //             <p>CurrentXp: {characterData.totalExperience}</p>
    //             {/* NODE: LAVING IT AS IT IS BEFORE DECIDE WHAT TO TO WITH IT  */}
    //             {/* <p>XP:{characterData?.totalExperience}xp</p> */}
    //             <p>Gold:{characterData?.gold}</p>
    //             <div>
    //                 <p>Equipment:</p>
    //                 <div className="characterEquipment">{equippedItemsBySlot}</div>
    //             </div>
    //         </div>
    //         <div>
    //             <p>Stats:</p>
    //             <p>HP:100</p>
    //             <p>Att: {calculatedEquipmentStats.attack}</p>
    //             <p>Def: {calculatedEquipmentStats.armor}</p>
    //             <p>Ele. Protection: {calculatedEquipmentStats.elementalProtection}</p>
    //             <p>Recovery:{calculatedEquipmentStats.recovery}</p>
    //             <p>Drop Chance:{calculatedEquipmentStats.dropChance}</p>
    //         </div>
    //     </section>
    // );
}
