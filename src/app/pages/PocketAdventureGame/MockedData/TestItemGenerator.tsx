import type React from "react";
import { loadStorageData, saveItems } from "../services/storageOperations";
import type { Item } from "../types/gameTypes";

/* ======================
   Types
====================== */
type ItemType = "equipment" | "materials" | "consumables";
type EquipmentType = "armor" | "boots" | "weapon" | "helm";

export const STORAGE_KEY = "spawnedData";

function idGenerator() {
    // latter this will be removed latter so magic numbers for now are OK!
    const idTime = Number(new Date());
    const randomIdNumber = Math.ceil(Math.random() * 1000);
    const itemId = idTime + randomIdNumber;
    return itemId;
}

function itemValueGenerator() {
    return Math.ceil(Math.random() * 100);
}

export function TestItemGenerator() {
    const createItems = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);

        const itemName = form.get("itemName");
        let itemType = form.get("itemType");
        let quantity = form.get("quantity");
        const itemId = idGenerator();
        const itemValue = itemValueGenerator();
        let equipmentSlot;

        if (
            typeof itemName !== "string" ||
            typeof itemType !== "string" ||
            typeof quantity !== "string"
        ) {
            return;
        }

        if (itemType === "potion" || itemType === "material") {
            itemType;
        } else {
            equipmentSlot = itemType as EquipmentType;
            itemType = "equipment";
            quantity = "1";
        }

        const newItem: Item = {
            itemId: Number(itemId),
            name: itemName,
            type: itemType as ItemType,
            quantity: Number(quantity),
            itemValue: Number(itemValue),
            equipmentSlot: equipmentSlot as EquipmentType,
            isEquipped: false,
        };

        const currentItems = loadStorageData(STORAGE_KEY);
        const updatedItems = [...currentItems, newItem];
        saveItems(STORAGE_KEY, updatedItems);
    };

    return (
        <form onSubmit={createItems}>
            <label>Item Name:</label>
            <input type="text" name="itemName" />

            <label>Choose type:</label>
            <select name="itemType">
                <option value="potion">potion</option>
                <option value="material">material</option>
                <option value="armor">armor</option>
                <option value="helm">helm</option>
                <option value="gloves">gloves</option>
                <option value="boots">boots</option>
            </select>

            <label>Quantity:</label>
            <input type="number" min={0} max={100} name="quantity" />

            <button type="submit">Create</button>
        </form>
    );
}
