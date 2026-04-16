import { useEffect, useState } from "react";
import type { Character, ItemStore } from "../../../types/gameTypes";
import { loadStorageData, saveToStorage } from "../../../services/storageOperations";
import { CHARACTER_KEY, MISSION_KEY } from "../../../constants/gameConstants";
import { CalculateCharacterXp } from "../../../systems/stats/characterExperienceSystem";
import { generateMoreItems } from "../../../systems/items/generateItems";

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
            const updatedGold = prev.gold + amount;
            const characterUpdate = { ...prev, gold: updatedGold };
            saveToStorage(CHARACTER_KEY, characterUpdate);
            return characterUpdate;
        });
    };

    const addExperience = (amountXp: number) => {
        setCharacterData((prev) => {
            const updatedXp = prev.totalExperience + amountXp;
            const updatedCharacter = { ...prev, totalExperience: updatedXp };
            saveToStorage(CHARACTER_KEY, updatedCharacter);
            return updatedCharacter;
        });
    };

    return { characterData, addExperience, addGold };
}
