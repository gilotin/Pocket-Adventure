import type { Character, EquipmentType, Item, ItemStats } from "../../types/gameTypes";
import {
    BASE_DROP_CHANCE_MULTIPLIER,
    CONSUMABLE_QUANTITY_MULTIPLIER,
    ITEM_LEVEL_RANGE,
    MATERIAL_QUANTITY_MULTIPLIER,
    MAX_PRICE,
    MIN_PRICE,
} from "../../constants/gameConstants";
import { ITEM_NAME_PARTS, RARITY_MULTIPLIER } from "./itemTable";

type BaseGenerateOptions = {
    characterLevel: number;
};

type GenerateItemsOptions =
    | (BaseGenerateOptions & {
          itemType: "equipment";
          equipmentType: EquipmentType;
      })
    | (BaseGenerateOptions & {
          itemType: "consumable";
      })
    | (BaseGenerateOptions & {
          itemType: "materials";
      });

function getRandomItemElement(element: string[]): string | undefined {
    if (!element?.length) return undefined;
    const result = element[Math.floor(Math.random() * element.length)];
    return result;
}

export function generateItem(props: GenerateItemsOptions): Item {
    const itemType = props.itemType;
    const itemId = crypto.randomUUID();

    const itemValue = Math.floor(Math.random() * (MAX_PRICE - MIN_PRICE + 1)) + MIN_PRICE;

    const parts = ITEM_NAME_PARTS[props.itemType];
    const itemPrefix = getRandomItemElement(parts.prefixes);
    const itemSuffixes = getRandomItemElement(parts.suffixes);
    let itemBase = getRandomItemElement(parts.bases);

    if (props.itemType === "equipment") {
        itemBase = props.equipmentType;
    }

    const itemName = [itemPrefix, itemBase, itemSuffixes].filter(Boolean).join(" ");

    const equipmentType = props.itemType === "equipment" ? props.equipmentType : undefined;

    const characterLevel = props.characterLevel;

    let quantity = 1;
    if (props.itemType === "materials" || props.itemType === "consumable") {
        quantity = Math.floor(Math.random() * (characterLevel * MATERIAL_QUANTITY_MULTIPLIER)) + 1;
    }

    // ITEM LEVEL AND REQUIRED LEVEL
    let requiredLevel = 1;

    const minItemLevel = Math.max(1, characterLevel - ITEM_LEVEL_RANGE);
    const maxItemLevel = characterLevel + ITEM_LEVEL_RANGE;

    requiredLevel = Math.floor(Math.random() * (maxItemLevel - minItemLevel + 1)) + minItemLevel;

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
            dropChance: rarityMultiplier * BASE_DROP_CHANCE_MULTIPLIER,
        };
    } else if (equipmentType === "armor" || equipmentType === "boots" || equipmentType === "helm") {
        stats = {
            armor: getBaseStat() * rarityMultiplier,
            elementalProtection: getBaseStat() * rarityMultiplier,
            recovery: getBaseStat() * rarityMultiplier,
            dropChance: rarityMultiplier * BASE_DROP_CHANCE_MULTIPLIER,
        };
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
