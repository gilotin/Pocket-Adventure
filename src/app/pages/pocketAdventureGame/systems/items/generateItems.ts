import type { EquipmentType, Item, ItemStats, ItemType } from "../../types/gameTypes";
import {
    BASE_DROP_CHANCE_MULTIPLIER,
    ITEM_LEVEL_RANGE,
    MAX_PRICE,
    MIN_PRICE,
} from "../../constants/gameConstants";
import { ITEM_NAME_PARTS, RARITY_MULTIPLIER } from "./itemTable";

type GenerateItemsOptions = {
    characterLevel: number;
    itemType: ItemType;
    equipmentType?: EquipmentType;
};

function getRandomItemElement(element: string[]): string | undefined {
    if (!element?.length) return undefined;
    const result = element[Math.floor(Math.random() * element.length)];
    return result;
}

export function generateItem(props: GenerateItemsOptions): Item {
    const itemType = props.itemType;
    const itemId = crypto.randomUUID();

    const itemValue = Math.floor(Math.random() * (MAX_PRICE - MIN_PRICE + 1)) + MIN_PRICE;

    // GENERATE ITEM NAME

    const parts = ITEM_NAME_PARTS[props.itemType];
    const itemPrefix = getRandomItemElement(parts.prefixes);
    const itemSuffixes = getRandomItemElement(parts.suffixes);
    let itemBase = getRandomItemElement(parts.bases);

    if (props.itemType === "equipment") {
        itemBase = props.equipmentType;
        if (itemBase) {
            const firsLetter = itemBase[0].toUpperCase();
            itemBase = firsLetter?.concat(itemBase?.slice(1));
        }
    }

    const itemName = [itemPrefix, itemBase, itemSuffixes].filter(Boolean).join(" ");

    const equipmentType = props.itemType === "equipment" ? props.equipmentType : undefined;

    const characterLevel = props.characterLevel;

    // GENERATE ITEM QUANTITY

    let quantity = 1;
    // if (props.itemType === "materials" || props.itemType === "consumable") {
    //     quantity = Math.floor(Math.random() * (characterLevel * QUANTITY_MULTIPLIER)) + 1;
    // }

    // ITEM LEVEL AND REQUIRED LEVEL

    let requiredLevel = 1;

    const minItemLevel = Math.max(1, characterLevel - ITEM_LEVEL_RANGE);
    const maxItemLevel = characterLevel + ITEM_LEVEL_RANGE;

    requiredLevel = Math.floor(Math.random() * (maxItemLevel - minItemLevel + 1)) + minItemLevel;

    // RARITY AND STATS

    const rarity = itemPrefix?.toLowerCase();

    const rarityMultiplier =
        rarity === "common" || rarity === "magic" || rarity === "unique"
            ? RARITY_MULTIPLIER[rarity]
            : RARITY_MULTIPLIER["common"];

    const getBaseStat = () => Math.floor(Math.random() * requiredLevel) + characterLevel;

    let stats: ItemStats | undefined;

    if (equipmentType === "weapon") {
        stats = {
            attack: getBaseStat() * rarityMultiplier,
            recovery: getBaseStat() * rarityMultiplier,
            dropChance: Math.floor(rarityMultiplier * BASE_DROP_CHANCE_MULTIPLIER),
        };
    } else if (equipmentType === "armor" || equipmentType === "boots" || equipmentType === "helm") {
        stats = {
            armor: getBaseStat() * rarityMultiplier,
            elementalProtection: getBaseStat() * rarityMultiplier,
            recovery: getBaseStat() * rarityMultiplier,
            dropChance: Math.floor(rarityMultiplier * BASE_DROP_CHANCE_MULTIPLIER),
        };
    }

    // ICONS

    const equipmentIconMap = {
        weapon: "weapons",
        armor: "equipment",
        boots: "equipment",
        helm: "equipment",
    };

    const itemTypeIconMap = {
        equipment: "equipment",
        materials: "pouch",
        consumable: "potion",
    };

    let icon = "";

    if (equipmentType === "armor") {
        icon = equipmentIconMap[equipmentType];
    } else if (itemType === "materials" || itemType === "consumable") {
        icon = itemTypeIconMap[itemType];
    }

    const item: Item = {
        itemId: itemId,
        name: itemName,
        requiredLevel,
        quantity,
        stats,
        itemValue,
        equipmentSlot: equipmentType,
        type: itemType,
        isEquipped: false,
        icon,
    };

    return item;
}

export function generateMoreItems(cycles: number, props: GenerateItemsOptions) {
    const itemArray = [];
    for (let index = 0; index < cycles; index++) {
        const item = generateItem(props);

        itemArray.push(item);
    }

    return itemArray;
}
