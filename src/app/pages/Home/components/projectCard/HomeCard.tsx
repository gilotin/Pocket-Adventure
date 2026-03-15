import type { ProjectData } from "../../staticData/staticHomeData";
import styles from "./HomeCard.module.css";

type CardProps = { data: ProjectData };

export default function HomeCard({ data }: CardProps) {
    const cardList = data.map((card) => {
        return (
            <article key={card.id} className={styles.cardWrapper}>
                <h3 className={styles.header}>{card.title}</h3>
                <p className={styles.description}>{card.description}</p>
                <ul className={styles.technologies}>
                    {card.technologies.map((technology) => {
                        return <li key={technology}>{technology}</li>;
                    })}
                </ul>

                <div className={styles.actions}>
                    <a
                        className={styles.linkButton}
                        href={card.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View source
                    </a>
                    <a
                        className={styles.linkButton}
                        href={card.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Live
                    </a>
                </div>
            </article>
        );
    });

    return cardList;
}
