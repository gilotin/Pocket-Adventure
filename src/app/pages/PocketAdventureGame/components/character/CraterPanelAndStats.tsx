import type { Character } from "../../types/gameTypes";

type CharacterPanelAndStatsProps = {
    characterData: Character;
};

export function CharacterPanelAndStats({ characterData }: CharacterPanelAndStatsProps) {
    return (
        <section>
            <h3>{characterData?.name}</h3>
            <p>XP:{characterData?.experience}xp</p>
            <p>Gold:{characterData?.gold}</p>
            <div>
                <p>Equipment:</p>
                <div className="characterEquipment">
                    <p>Armor:</p>
                    <p>Helm:</p>
                    <p>Gloves:</p>
                    <p>Boots:</p>
                </div>
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
