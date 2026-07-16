import styles from "../CharacterPanelAndStats.module.css";
import type { Character, ItemStats } from "../../../types/gameTypes";
import { CharacterStats } from "./CharacterStats";

type CharacterCardInfoProps = {
    calculatedStats: ItemStats;
    characterData: Character;
    characterProgress: {
        level: number;
        xpIntoLevel: number;
        xpRequired: number;
        progressPercent: number;
    };
};

export function CharacterCardInfo({
    characterData,
    calculatedStats,
    characterProgress,
}: CharacterCardInfoProps) {
    return (
        <section className={styles.statsCard}>
            <div className={styles.characterInfoPanel}>
                <div className={styles.imageBorder}>
                    <img src="assets/character_profile.png" alt="character profile" />
                </div>
                <div className={styles.characterInfoStats}>
                    <div className={styles.characterName}>{characterData.name}</div>
                    <div className={styles.characterLevel}>
                        <span>Level</span>
                        {characterProgress.level}
                    </div>
                    <div className={styles.characterXp}>
                        <div>XP:</div>
                        <div className={styles.bar}>
                            <div
                                className={styles.fill}
                                style={{ width: `${characterProgress.progressPercent}%` }}
                            />

                            <span>
                                {characterProgress.xpIntoLevel}/{characterProgress.xpRequired}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <CharacterStats calculatedStats={calculatedStats} characterData={characterData} />
        </section>
    );
}
