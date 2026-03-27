/*======================================
 AUTH TYPES
======================================*/

export type AuthAction = "login" | "register" | "guest";
export type AuthMode = "menu" | "login" | "register";
export type AuthErrorType = string | null;
export type AuthUser = {
    id: string;
    type: "guest" | "user";
};

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
    gold: number;
    totalExperience: number;
};

/*======================================
 MENU TYPES
======================================*/

export type GameMenuState = "crafting" | "garden" | "missions" | "shop" | "inventory" | "character";

/*======================================
 MISSIONS TYPES
======================================*/

export type Mission = {
    id: string;
    type: "quests" | "story" | "expeditions";
    duration: number;
    title: string;
    requirements?: {
        level?: number;
        attack?: number;
        armor?: number;
        elementalProtection?: number;
    };
    description: string;
    rewards: MissionReward;
};

export type MissionData = Mission[];

export type MissionReward = {
    xp: number;
    gold: number;
    materials?: string[];
    items?: ItemRewards;
    potions?: number;
};

export type ItemRewards = ("armor" | "helm" | "gloves" | "boots")[];

export type ActiveMission = {
    missionId: string;
    rewards: MissionReward;
    startedAt: number;
    durationMs: number;
} | null;
