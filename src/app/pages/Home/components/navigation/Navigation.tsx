import styles from "./Navigation.module.css";

export function Navigation() {
    return (
        <nav className={styles.navWrapper}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <a href="#">Home</a>
                </li>
                <li className={styles.item}>
                    <a href="#roadmap">Roadmap</a>
                </li>
                <li className={styles.item}>
                    <a href="#projects">Projects</a>
                </li>
                <li className={styles.item}>
                    <a href="#playground">Playground</a>
                </li>
                <li className={styles.item}>
                    <a href="#contacts">Contacts</a>
                </li>
            </ul>
        </nav>
    );
}
