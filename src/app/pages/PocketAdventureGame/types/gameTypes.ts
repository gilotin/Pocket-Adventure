/*======================================
 AUTH TYPES
======================================*/

export type AuthStatus = "unknown" | "guest" | "authenticated";
export type AuthMode = "login" | "register";
export type AuthErrorType = string | null;

/*======================================
 ACCOUNT TYPES
======================================*/

export type AccountData = {
    accountName: string;
    profileName: string;
    email: string;
} | null;

/*======================================
 ITEM TYPES
======================================*/

export type ItemStats = {
    attack: number;
    armor: number;
    elementalProtection: number;
    recovery: number;
    dropChance: number;
};

export type Item = {
    itemId: number;
    itemLevel: number;
    requireLevel: number;
    name: string;
    type: "equipment" | "materials" | "consumables";
    stats?: ItemStats;
    quantity: number;
    itemValue: number;
    equipmentSlot: EquipmentSlot;
    isEquipped: boolean;
};

export type ItemStore = Item[];

/*======================================
 EQUIPMENT TYPES
======================================*/

export type EquipmentSlot = "weapon" | "armor" | "helm" | "boots";

/*======================================
 CHARACTER TYPES
======================================*/

export type CharacterEquipment = {
    weapon: number | null;
    armor: number | null;
    helm: number | null;
    boots: number | null;
};

export type Character = {
    name: string;
    equipment: CharacterEquipment;
    gold: number;
    experience: number;
};

/*======================================
 MENU TYPES
======================================*/

export type GameMenuState = "crafting" | "garden" | "missions" | "shop" | "inventory" | "character";
