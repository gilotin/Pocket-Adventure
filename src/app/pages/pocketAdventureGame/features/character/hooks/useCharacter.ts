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

    const addGold = (amount: number) => {
        setCharacterData((prev) => {
            const updated = prev.gold + amount;
            const characterUpdate = { ...prev, gold: updated };
            saveToStorage(CHARACTER_KEY, characterUpdate);
            return characterUpdate;
        });
    };

    const addExperience = (amount: number) => {
        setCharacterData((prev) => {
            const updatedXp = prev.totalExperience + amount;
            const updatedCharacter = { ...prev, totalExperience: updatedXp };
            saveToStorage(CHARACTER_KEY, updatedCharacter);
            return updatedCharacter;
        });
    };

    return { characterData, addExperience, addGold };
}
