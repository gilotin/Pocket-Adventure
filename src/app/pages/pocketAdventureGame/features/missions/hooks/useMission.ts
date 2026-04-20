/**
 * Manages mission lifecycle: starting, completing, and abandoning missions.
 * All mission state is persisted to localStorage.
 *
 * This hook is the single source of truth for mission data and mutations.
 * It ensures that mission state is initialized from storage and kept in sync on updates.
 *
 * Note:
 * - Does not handle reward application or game-side effects.
 * - Does not manage mission progress timing (UI responsibility).
 */
import { useEffect, useState } from "react";
import type { ActiveMission } from "../../../types/gameTypes";
import { loadStorageData, saveToStorage } from "../../../services/storageOperations";
import { MISSION_KEY } from "../../../constants/gameConstants";
import { missionData } from "../data/missionsData";

export function useMission() {
    const [activeMission, setActiveMission] = useState<ActiveMission>(null);

    useEffect(() => {
        const storedMission = loadStorageData<ActiveMission | null>(MISSION_KEY, null);
        setActiveMission(storedMission);
    }, []);

    const startMission = (missionId: string) => {
        if (activeMission) {
            return;
        }
        const missionDefinition = missionData.find((mission) => mission.id === missionId);

        if (!missionDefinition) {
            return;
        }

        const missionStartTime = Date.now();
        const durationSeconds = missionDefinition.duration;
        const missionRewards = missionDefinition.rewards;

        const currentActiveMissionData: ActiveMission = {
            missionId: missionId,
            rewards: missionRewards,
            startedAt: missionStartTime,
            durationMs: durationSeconds * 1000,
        };

        saveToStorage(MISSION_KEY, currentActiveMissionData);
        setActiveMission(currentActiveMissionData);
    };

    const abandonMission = (): void => {
        localStorage.removeItem(MISSION_KEY);
        setActiveMission(null);
    };

    const completeMission = () => {
        if (!activeMission) return null;

        const mission = activeMission;

        setActiveMission(null);
        localStorage.removeItem(MISSION_KEY);

        return mission;
    };

    return {
        activeMission,
        startMission,
        abandonMission,
        completeMission,
    };
}
