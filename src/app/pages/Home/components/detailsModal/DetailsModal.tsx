import styles from "./DetailsModal.module.css";

export function DetailsModal() {
    return (
        <>
            <section className={styles.modalWrapper}>
                <h1 className={styles.modalHeader}>Project name</h1>
                <img
                    className={styles.modalBackground}
                    src=""
                    alt="this will be screen shot or ill make a carousel, we will see"
                />
                <p className={styles.modalDescription}>
                    This is the description for the project/ some words and maybe the technologies
                    used in the project.
                </p>
            </section>
        </>
    );
}
