/**
 * Manages character state, including gold and experience.
 * All mutations are persisted to localStorage.
 *
 * This hook is the single source of truth for all character-related data and mutations.
 * It ensures that character state is always initialized and updated immutably.
 *
 * Note: Level calculation and XP progression are handled by external systems.
 */
import { useState } from "react";
import type { Character } from "../../../types/gameTypes";
import { loadStorageData, saveToStorage } from "../../../services/storageOperations";
import { CHARACTER_KEY } from "../../../constants/gameConstants";

export function createFallbackCharacter(): Character {
    return {
        name: "Adventurer",
        gold: 100,
        totalExperience: 0,
    };
}

export function useCharacter() {
    const [characterData, setCharacterData] = useState(() => {
        return loadStorageData<Character>(CHARACTER_KEY, createFallbackCharacter());
    });

    /**
     * Increments character gold by a given amount.
     *
     * @param amount - Amount of gold to add. Expected to be a non-negative number.
     */
    const addGold = (amount: number) => {
        setCharacterData((prev) => {
            const updated = prev.gold + amount;
            const characterUpdate = { ...prev, gold: updated };
            saveToStorage(CHARACTER_KEY, characterUpdate);
            return characterUpdate;
        });
    };

    const removeGold = (amount: number) => {
        setCharacterData((prev) => {
            const updated = prev.gold - amount;
            const characterUpdate = { ...prev, gold: updated };
            saveToStorage(CHARACTER_KEY, characterUpdate);
            return characterUpdate;
        });
    };

    const checkGold = (itemCost: number) => {
        if (itemCost > characterData.gold) return false;
        return true;
    };

    /**
     * Increments character experience by a given amount.
     *
     * @param amount - Amount of experience to add. Expected to be a non-negative number.
     */
    const addExperience = (amount: number) => {
        setCharacterData((prev) => {
            const updatedXp = prev.totalExperience + amount;
            const updatedCharacter = { ...prev, totalExperience: updatedXp };
            saveToStorage(CHARACTER_KEY, updatedCharacter);
            return updatedCharacter;
        });
    };

    return { characterData, addExperience, addGold, removeGold, checkGold };
}
