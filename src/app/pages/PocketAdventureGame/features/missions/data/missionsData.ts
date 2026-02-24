import type { MissionData } from "../../../types/gameTypes";

export const missionData: MissionData = [
    {
        id: "s1",
        type: "story",
        title: "What happened",
        duration: 5,
        description: "Here will be added description to the story mission.",
        rewards: {
            xp: 5,
            gold: 10,
        },
    },
    {
        id: "s2",
        type: "story",
        title: "What happened",
        duration: 60,
        description: "Here will be added description to the story mission.",
        rewards: {
            xp: 15,
            gold: 100,
        },
    },
    {
        id: "s3",
        type: "story",
        title: "What happened",
        duration: 160,
        description: "Here will be added description to the story mission.",
        rewards: {
            xp: 50,
            gold: 250,
        },
    },
    {
        id: "s4",
        type: "story",
        title: "What happened",
        requirements: {
            attack: 20,
            armor: 10,
            elementalProtection: 10,
        },
        duration: 500,
        description: "Here will be added description to the story mission.",
        rewards: {
            xp: 150,
            gold: 310,
        },
    },
    {
        id: "q1",
        type: "quests",
        title: "Quest 1",
        duration: 300,
        description: "Here will be added description to the quest mission.",
        rewards: {
            xp: 30,
            gold: 25,
        },
    },
    {
        id: "q2",
        type: "quests",
        title: "Quest 2",
        duration: 300,
        description: "Here will be added description to the quest mission.",
        rewards: {
            xp: 30,
            gold: 25,
        },
    },
    {
        id: "q3",
        type: "quests",
        title: "Quest 3",
        duration: 300,
        description: "Here will be added description to the quest mission.",
        rewards: {
            xp: 30,
            gold: 25,
        },
    },
    {
        id: "q4",
        type: "quests",
        title: "Quest 4",
        duration: 300,
        description: "Here will be added description to the quest mission.",
        rewards: {
            xp: 30,
            gold: 25,
        },
    },
    {
        id: "q5",
        type: "quests",
        title: "Quest 5",
        duration: 300,
        description: "Here will be added description to the quest mission.",
        rewards: {
            xp: 30,
            gold: 25,
        },
    },
    {
        id: "q6",
        type: "quests",
        title: "Quest 6",
        duration: 300,
        description: "Here will be added description to the quest mission.",
        rewards: {
            xp: 30,
            gold: 25,
        },
    },
    {
        id: "e1",
        type: "expeditions",
        title: "Expedition 1",
        duration: 5000,
        description: "Here will be added description to the quest mission.",
        rewards: {
            xp: 150,
            gold: 250,
            items: ["gloves", "boots"],
        },
    },
    {
        id: "e2",
        type: "expeditions",
        title: "Expedition 2",
        duration: 43200,
        description: "Here will be added description to the quest mission.",
        rewards: {
            xp: 300,
            gold: 2500,
            items: ["gloves", "boots", "armor", "helm"],
        },
    },
];
