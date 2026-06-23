import { useEffect, useState } from "react";
import type { Merchant } from "../../../types/gameTypes";
import { loadStorageData, saveToStorage } from "../../../services/storageOperations";
import { SHOP_KEY } from "../../../constants/gameConstants";

export function useShop() {
    const [shop, setShop] = useState<Merchant>({ items: [], timer: null });
    const [activeShopItemId, setActiveShopItemId] = useState<string | null>(null);
    const [showShopDetailsCard, setShowShopDetailsCard] = useState(false);

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const storedShop = loadStorageData(SHOP_KEY, { items: [], timer: null });

        setShop(storedShop);
        setIsLoaded(true);
    }, []);

    const activeShopItem = shop.items.find((item) => item.itemId === activeShopItemId) ?? null;

    const selectShopItem = (itemId: string | null) => {
        if (!itemId) {
            setActiveShopItemId(null);
            setShowShopDetailsCard(false);
            return;
        }

        setActiveShopItemId(itemId);
        setShowShopDetailsCard(true);
    };

    const updateShop = (nextShop: Merchant) => {
        saveToStorage(SHOP_KEY, nextShop);
        setShop(nextShop);
    };

    const removeItem = (itemId: string) => {
        setShop((prev) => {
            const updatedShopList = prev.items.filter((item) => item.itemId !== itemId);

            saveToStorage(SHOP_KEY, { ...prev, items: updatedShopList });
            return { ...prev, items: updatedShopList };
        });
        setShowShopDetailsCard(false);
    };

    return {
        shop,
        activeShopItem,
        activeShopItemId,
        showShopDetailsCard,
        selectShopItem,
        updateShop,
        removeItem,
        isLoaded,
    };
}
