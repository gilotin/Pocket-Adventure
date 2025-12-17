import type { HomePageSection } from "../../staticData";
import styles from "./HomeCard.module.css";

type HomeCardProps = {
    section: HomePageSection;
};

export default function HomeCard(props: HomeCardProps) {
    if (!props.section.items) {
        // will throw error or return a paragraph with some text.
        return null;
    }

    const projectList = props.section.items.map((item) => {
        return (
            <>
                <article className={styles.card}>
                    <h3>{item.title}</h3>
                    {item.image && (
                        <img src={item.image} alt="some img as background of the project" />
                    )}
                    <p className={styles.description}>{item.description}</p>
                </article>
            </>
        );
    });

    return <>{projectList}</>;
}
