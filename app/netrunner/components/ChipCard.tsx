import Image from "next/image";
import { Post } from "../types";
import styles from "./ChipCard.module.css";

interface ChipCardProps {
  post: Post;
  onClick: () => void;
}

export default function ChipCard({ post, onClick }: ChipCardProps) {
  return (
    <div className={styles.chipCard} onClick={onClick}>
      <div className={styles.cardContent}>
        <div className={styles.chipHeader}>
          <span>ID: {post.id}</span>
          <span>SEC_LEVEL: 5</span>
        </div>
        <div className={styles.chipImgWrapper}>
          <Image
            src={post.img}
            className={styles.chipImg}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={styles.chipTitle}>{post.title}</div>
        <div className={styles.chipDesc}>{post.desc}</div>
        <button className={styles.actionBtn}>[ ACCESS_FILE ]</button>
      </div>
    </div>
  );
}
