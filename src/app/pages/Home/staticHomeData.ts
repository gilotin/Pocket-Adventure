export type Project = {
    id: string;
    title: string;
    description: string[];
    image?: string;
};

export type HomePageSection = {
    title?: string;
    image?: string;
    text?: string[];
    items?: Project[];
};

type HomePageData = Record<string, HomePageSection>;

export const homePageData: HomePageData = {
    hero: {
        text: [
            "Hi, my name is Nikolay Toshev, and I'm learning to become a web developer. I enjoy building projects and exploring modern web technologies, with a focus on React and TypeScript. I'm currently working on larger projects to improve my architecture, testing, and state-management skills.",
        ],
    },
    roadmap: {
        text: [
            "Currently I'm building my fist big project called",
            "Pocket Adventure",
            "you can find more about it on my",
            "project section",
        ],
    },
    projects: {
        title: "Projects",
        items: [
            {
                id: "pocket-adventure",
                title: "Pocket Adventure",
                description: [
                    "Pocket Adventure is a small browser-based idle game.",
                    "The goal is to send your character on quests and improve gear via crafting.",
                ],
                // image: "/images/pocket-adventure.png",
            },
        ],
    },
};
