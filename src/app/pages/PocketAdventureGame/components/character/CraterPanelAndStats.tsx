export function CharacterPanelAndStats() {
    return (
        <section>
            <h3>Character name</h3>
            <p>XP: 200XP/340XP</p>
            <p>Gold: 1200</p>
            <div>
                <p>Equipment:</p>
                <div className="characterEquipment">
                    <p>Armor:</p>
                    <p>Helm:</p>
                    <p>gloves:</p>
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
