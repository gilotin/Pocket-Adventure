import { useState } from "react";
import { MissionNavigation } from "./missionNavigation/MissionNavigation";

export function Missions() {
    const [missionNavigation, setMissionNavigation] = useState("");

    return (
        <section>
            <h1>Missions</h1>
            <MissionNavigation setMissionNavigation={setMissionNavigation} />
        </section>
    );
}
