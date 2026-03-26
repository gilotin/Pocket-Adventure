export type ProjectData = {
    id: string;
    title: string;
    description: string;
    repoUrl?: string;
    liveUrl?: string;
    technologies: string[];
    isFeatured: boolean;
}[];

export const projectData: ProjectData = [
    {
        id: "1",
        title: "Pocket-Adventure",
        description:
            "A browser-based RPG application built with React and TypeScript that showcases structured state management, persistent client-side storage, and modular UI architecture through systems like missions, inventory management, and character progression.",
        repoUrl:
            "https://github.com/gilotin/Pocket-Adventure/tree/main/src/app/pages/pocketAdventureGame",
        liveUrl: "/game",
        technologies: ["React", "TypeScript", "CSS", "Firebase"],
        isFeatured: true,
    },
    {
        id: "2",
        title: "Practice-hub",
        description:
            "A collection of small experiments and exercises used to explore and practice different web technologies.",
        repoUrl: "https://github.com/gilotin/Practice-hub",
        liveUrl: "https://practice-hub-teal.vercel.app/",
        technologies: ["React", "TypeScript", "CSS"],
        isFeatured: false,
    },
    {
        id: "3",
        title: "Age calculator",
        description:
            "A Frontend Mentor challenge implementing an Age Calculator with JavaScript, featuring form validation, date calculations, and responsive UI.",
        repoUrl: "https://github.com/gilotin/Age-calculator-app",
        liveUrl: "https://age-calculator-app-tan-chi.vercel.app/",
        technologies: ["JavaScript", "CSS", "HTML"],
        isFeatured: false,
    },
    {
        id: "4",
        title: "Bento-Grid",
        description: "A Frontend Mentor UI project, practicing grid layout.",
        repoUrl: "https://github.com/gilotin/Bento-grid",
        liveUrl: "https://bento-grid-sepia.vercel.app/",
        technologies: ["JavaScript", "HTML", "CSS"],
        isFeatured: false,
    },
    {
        id: "5",
        title: "Tansies game",
        description: "A FreeCode Camp challenge taken from one of their React courses.",
        repoUrl: "https://github.com/gilotin/Tenzies-react-practice",
        liveUrl: "https://tenzies-react-practice.vercel.app/",
        technologies: ["React"],
        isFeatured: false,
    },
    {
        id: "6",
        title: "Fate - Plovdiv Game Jam'26 (Case Study)",
        description:
            "Case study of a 48-hour game jam project where I contributed to level design, mechanics, and presentation.",
        repoUrl: "https://github.com/gilotin/fate-game-jam-case-study",
        liveUrl: "https://globalgamejam.org/games/2026/fate-1",
        technologies: ["Unity", ".NET"],
        isFeatured: true,
    },
];
