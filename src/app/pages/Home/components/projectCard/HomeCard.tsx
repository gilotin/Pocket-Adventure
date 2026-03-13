import styles from "./HomeCard.module.css";

export default function HomeCard() {
    return (
        <article className={styles.cardWrapper}>
            <h3 className={styles.header}>Project Name</h3>
            <p className={styles.description}>
                project descriptionproject descriptionproject description project description
                project description project description
                ddddddddddddddddddddddddddddddddddddddddddddd
            </p>
            <ul className={styles.technologies}>
                <li>JS</li>
                <li>React</li>
            </ul>

            <div className={styles.actions}>
                <a className={styles.linkButton} href="#" target="_blank" rel="noopener noreferrer">
                    View source
                </a>
                <a className={styles.linkButton} href="#" target="_blank" rel="noopener noreferrer">
                    Live
                </a>
            </div>
        </article>
    );
}
