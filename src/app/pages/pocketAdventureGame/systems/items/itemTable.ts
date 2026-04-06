export const ITEM_NAME_PARTS = {
    equipment: {
        prefixes: ["Common", "Magic", "Unique"],
        bases: ["Weapon", "Armor", "Boots", "Helm"],
        suffixes: ["of Power", "of Strength", "of Agility", "of Wisdom", "of Greed"],
    },
    consumable: {
        prefixes: ["Crude", "Fine", "Exceptional"],
        bases: ["Elixir", "Potion"],
        suffixes: ["of Healing", "of Power", "of Recovery", "of Greed", "of Defense"],
    },
    materials: {
        prefixes: ["Raw", "Refined", "Exceptional"],
        bases: ["Iron", "Wood"],
        suffixes: [],
    },
};

export const RARITY_MULTIPLIER = {
    common: 1,
    magic: 2,
    unique: 3,
};
