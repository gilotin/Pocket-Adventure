import type { ItemStore } from "../../types/gameTypes";

type CharacterStats = {
    attack: 0;
    armor: 0;
    elementalProtection: 0;
    dropChance: 0;
    recovery: 0;
};

type CalculateCharacterStatsParams = {
    inventoryItems: ItemStore;
};

export function calculateCharacterStats({ inventoryItems }: CalculateCharacterStatsParams) {
    const baseStats: CharacterStats = {
        attack: 0,
        armor: 0,
        elementalProtection: 0,
        dropChance: 0,
        recovery: 0,
    };

    return inventoryItems
        .filter((item) => item.isEquipped)
        .reduce((totals, item) => {
            if (!item.stats) return totals;
            totals.attack += item.stats.attack ?? 0;
            totals.armor += item.stats.armor ?? 0;
            totals.elementalProtection += item.stats.elementalProtection ?? 0;
            totals.dropChance += item.stats.dropChance ?? 0;
            totals.recovery += item.stats.recovery ?? 0;

            return totals;
        }, baseStats);
}
