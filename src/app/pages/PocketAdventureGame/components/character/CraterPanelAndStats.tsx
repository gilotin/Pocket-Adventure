import type { Character, Item } from "../../types/gameTypes";

type CharacterPanelAndStatsProps = {
    characterData: Character;
    inventoryItems: Item[];
};

export function CharacterPanelAndStats({
    characterData,
    inventoryItems,
}: CharacterPanelAndStatsProps) {
    const filteredEquippedItems = inventoryItems.filter((item) => item.isEquipped === true);
    const equippedItemsBySlot = filteredEquippedItems.map((item) => {
        return (
            <div key={item.itemId}>
                <p>
                    {item?.equipmentSlot}:{item.name}
                </p>
                <button>Unequip</button>
            </div>
        );
    });

    return (
        <section>
            <h3>{characterData?.name}</h3>
            <p>XP:{characterData?.experience}xp</p>
            <p>Gold:{characterData?.gold}</p>
            <div>
                <p>Equipment:</p>
                <div className="characterEquipment">{equippedItemsBySlot}</div>
                <div>
                    <p>Stats:</p>
                    <p>HP:100</p>
                    <p>Magic:100</p>
                    <p>Defense: 100</p>
                    <p>Offense: 120</p>
                </div>
            </div>
        </section>
    );
}
