import { useEffect, useState } from "react";
import type { Item } from "../../../types/gameTypes";
import { loadStorageData, saveToStorage } from "../../../services/storageOperations";
import { SHOP_KEY } from "../../../constants/gameConstants";

type Shop = {
    items: Item[];
    timer: number | null;
};
export function useShop() {
    const [shop, setShop] = useState<Shop>({ items: [], timer: null });

    useEffect(() => {
        const storedShop = loadStorageData(SHOP_KEY, { items: [], timer: null });

        setShop(storedShop);
    }, []);

    const updateShop = (nextShop: Shop) => {
        saveToStorage(SHOP_KEY, nextShop);
        setShop(nextShop);
    };

    return { shop, updateShop };
}
