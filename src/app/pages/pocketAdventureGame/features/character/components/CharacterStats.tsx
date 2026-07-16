import type { Character, ItemStats } from "../../../types/gameTypes";
import styles from "../CharacterPanelAndStats.module.css";

type CharacterStatsProps = {
    calculatedStats: ItemStats;
    characterData: Character;
};

export function CharacterStats({ calculatedStats, characterData }: CharacterStatsProps) {
    return (
        <div className={styles.characterStats}>
            <ul className={styles.statsList}>
                <li className={styles.stats}>
                    <img className={styles.statIcon} src="icons/hp_icon.png" alt="" />

                    <span className={styles.statName}>HP</span>
                    <span className={styles.statValue}>100</span>
                </li>

                <li className={styles.stats}>
                    <img className={styles.statIcon} src="icons/weapon_icon.png" alt="" />

                    <span className={styles.statName}>Attack</span>
                    <span className={styles.statValue}>{calculatedStats.attack}</span>
                </li>
                <li className={styles.stats}>
                    <img className={styles.statIcon} src="icons/phys_def_icon.png" alt="" />

                    <span className={styles.statName}>Armor</span>
                    <span className={styles.statValue}>{calculatedStats.armor}</span>
                </li>
                <li className={styles.stats}>
                    <img className={styles.statIcon} src="icons/ele_def_icon.png" alt="" />

                    <span className={styles.statName}>Ele. protection</span>
                    <span className={styles.statValue}>{calculatedStats.elementalProtection}</span>
                </li>
                <li className={styles.stats}>
                    <img className={styles.statIcon} src="icons/recovery_icon.png" alt="" />

                    <span className={styles.statName}>Recovery</span>
                    <span className={styles.statValue}>{calculatedStats.recovery}</span>
                </li>
                <li className={styles.stats}>
                    <img className={styles.statIcon} src="icons/drop_chance_icon.png" alt="" />

                    <span className={styles.statName}>Drop chance</span>
                    <span className={styles.statValue}>{calculatedStats.dropChance}</span>
                </li>
                <li className={styles.stats}>
                    <img className={styles.statIcon} src="icons/money-bag.png" alt="" />

                    <span className={styles.statName}>Gold</span>
                    <span className={styles.statValue}>{characterData.gold}</span>
                </li>
            </ul>
        </div>
    );
}
