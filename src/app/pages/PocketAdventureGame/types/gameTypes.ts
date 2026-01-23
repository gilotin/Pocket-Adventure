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

export type Item = {
    itemId: number;
    name: string;
    type: string;
    quantity: number;
    itemValue: number;
};

export type ItemStore = Item[];

/*======================================
 CHARACTER TYPES
======================================*/

export type Character = {
    name: string;
    equippedItemIds: number[];
    gold: number;
    experience: number;
};

/*======================================
 MENU TYPES
======================================*/

export type GameMenuState = "crafting" | "garden" | "missions" | "shop" | "inventory" | "character";
