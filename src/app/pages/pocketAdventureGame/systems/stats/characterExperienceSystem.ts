import type { Character } from "../../types/gameTypes";

type CharacterXpProps = {
    characterData: Character;
};

export function CalculateCharacterXp({ characterData }: CharacterXpProps) {
    const BASE_LEVEL_EXPERIENCE = 100;
    const BASE_LEVEL_MULTIPLIER = 1.25;

    let level = 1;
    let currentXp = characterData?.totalExperience;

    const requireXp = (level: number) => {
        return BASE_LEVEL_EXPERIENCE * BASE_LEVEL_MULTIPLIER ** (level - 1);
    };

    while (currentXp >= requireXp(level)) {
        currentXp -= requireXp(level);
        level++;
    }

    const xpRequired = requireXp(level);
    const progressPercent = (currentXp / xpRequired) * 100;

    return {
        level,
        xpIntoLevel: currentXp,
        xpRequired,
        progressPercent,
    };
}
