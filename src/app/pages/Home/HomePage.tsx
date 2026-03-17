import HomeCard from "./components/projectCard/HomeCard";
import styles from "./HomePage.module.css";
import { projectData } from "./staticData/staticHomeData";

export function HomePage() {
    const featuredProjects = projectData.filter((project) => project.isFeatured === true);

    const otherProjects = projectData.filter((projects) => projects.isFeatured !== true);
    // To move the maps here not in the child
    return (
        <div className={styles.homePage}>
            <header id="home" className={styles.heroWrapper}>
                <h1 className={styles.hero}>
                    Hi, I'm <span className={styles.heroName}>Nikolay Toshev</span>,
                </h1>
                <p className={styles.heroSubtitle}>
                    a web developer focused on building interactive and well-structured web
                    applications with React and TypeScript.
                </p>
            </header>

            <section id="about" className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionNumber}>01</span>
                    <h2 className={styles.header}>About</h2>
                </div>
                <div>
                    <p>I'm a web developer based in Plovdiv, Bulgaria.</p>
                    <p>
                        About four years ago I started learning programming and completed the
                        JavaScript path at SoftUni. Since then, I've been slowly but steadily
                        learning core technologies such as JavaScript, TypeScript, React, HTML, and
                        vanilla CSS.
                    </p>
                    <p>
                        Currently, I work in a different field, but I'm passionate about programming
                        and want to transition into web development. I love building interesting
                        applications.
                    </p>
                    <p>
                        My current project is a browser-based game where I explore different
                        techniques on how to build better web applications.
                    </p>
                </div>
            </section>

            <section id="feature" className={styles.section}>
                <div className={styles.sectionContainer}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionNumber}>02</span>
                        <h2 className={styles.header}>Featured Works</h2>
                    </div>
                    <div className={styles.cardContainer}>
                        <HomeCard data={featuredProjects} />
                    </div>
                </div>
            </section>

            <section id="projects" className={styles.section}>
                <div className={styles.sectionContainer}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionNumber}>03</span>
                        <h2 className={styles.header}>Other Projects</h2>
                    </div>
                    <div className={styles.cardContainer}>
                        <HomeCard data={otherProjects} />
                    </div>
                </div>
            </section>

            <section id="roadmap" className={styles.section}>
                <div className={styles.sectionContainer}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionNumber}>04</span>
                        <h2 className={styles.header}>Roadmap</h2>
                    </div>
                    <p>
                        While building my main project, Pocket Adventure, I'm aiming to expand my
                        knowledge of topics such as state management, Firebase (for my backend and
                        authentication), and how to build proper application architecture.
                    </p>
                    <p>
                        I have plans to expand the project with more UI improvements and features
                        such as a mocked payment system and email functionality, while adding more
                        test coverage as the project evolves.
                    </p>
                </div>
            </section>

            <section id="contacts" className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionNumber}>05</span>
                    <h2 className={styles.header}>Contacts</h2>
                </div>
                <div className={styles.contacts}>
                    <p>You can contact me on:</p>
                    <ul className={styles.navIcons}>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/nikolay-m-toshev/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/gilotin"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fa-brands fa-github"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:toshevnikolay@gmail.com?subject=Portfolio Contact"
                                aria-label="Send email"
                            >
                                <i className="fa-solid fa-envelope"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
