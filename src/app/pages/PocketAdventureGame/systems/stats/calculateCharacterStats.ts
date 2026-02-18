import type { ItemStats, ItemStore } from "../../types/gameTypes";

type CalculateCharacterStatsParams = {
    inventoryItems: ItemStore;
};

export function calculateCharacterStats({ inventoryItems }: CalculateCharacterStatsParams) {
    const baseStats: ItemStats = {
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

            totals.attack += item.stats.attack;
            totals.armor += item.stats.armor;
            totals.elementalProtection += item.stats.elementalProtection;
            totals.dropChance += item.stats.dropChance;
            totals.recovery += item.stats.recovery;

            return totals;
        }, baseStats);
}
