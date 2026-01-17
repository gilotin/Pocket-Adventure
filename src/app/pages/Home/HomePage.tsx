import HomeCard from "./components/projectCard/HomeCard";
import styles from "./HomePage.module.css";
import { homePageData } from "./staticData";

export function HomePage() {
    return (
        <>
            <section className={`${styles.homeSection} ${styles.hero}`} id="hero">
                <article className={styles.card}>
                    <div>
                        <img src="" alt="Nikolay Toshev portrait" />
                    </div>
                    <p className={styles.heroDescription}>{homePageData.hero.text}</p>
                </article>
            </section>

            <section className={styles.roadmap}>
                <h2 id="roadmap" className={styles.header}>
                    Roadmap
                </h2>
                <article className={styles.card}>
                    <p className={styles.description}>{homePageData.roadmap.text}</p>
                </article>
            </section>

            <section className={styles.projects}>
                <h2 id="projects" className={styles.header}>
                    Projects
                </h2>
                <article className={styles.card}>
                    <HomeCard section={homePageData.projects} />
                </article>
                <article className={styles.card}>
                    <h3>Project name</h3>

                    <img src="#" alt="some img as background of the project" />
                    <p className={styles.description}>
                        My ongoing projects and projects im already done with. This will be most
                        likely component where on click you will be moved to another place to check
                        bigger picture and more info then here, but we will see.
                    </p>
                </article>
            </section>

            <section className={styles.playground}>
                <h2 id="playground" className={styles.header}>
                    Playground
                </h2>
                <article className={styles.card}>
                    <h3>Project name</h3>
                    <img src="" alt="" />
                    <p className={styles.description}>
                        This is the place where I test technologies that im not familiar with.
                        Building small projects that later will use like building blocks for my
                        projects.
                    </p>
                </article>
                <article className={styles.card}>
                    <h3>Project name</h3>
                    <img src="" alt="" />
                    <p className={styles.description}>
                        This is the place where I test technologies that im not familiar with.
                        Building small projects that later will use like building blocks for my
                        projects.
                    </p>
                </article>
            </section>

            <section className={styles.contacts}>
                <h2 id="contacts" className={styles.header}>
                    Contacts
                </h2>
                <div className={styles.wrapper}>
                    <article className={styles.card}>
                        <ul className={styles.contactList}>
                            <li>Contact:1</li>
                            <li>Contact:2</li>
                            <li>Contact:3</li>
                        </ul>
                    </article>
                </div>
            </section>
        </>
    );
}
