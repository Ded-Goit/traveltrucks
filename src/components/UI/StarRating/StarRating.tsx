'use client';

import Image from 'next/image';
import styles from './StarRating.module.css';

interface StarRatingProps {
  rating: number; // rating (0-5)
  size?: number; // star size
  singleStar?: boolean; // if true — shows only one star
}

export default function StarRating({
  rating,
  size = 20,
  singleStar = false,
}: StarRatingProps) {
  if (singleStar) {
    return (
      <div className={styles.stars}>
        <Image
          src="/icons/star_pressed.svg"
          alt="Star"
          width={size}
          height={size}
          className={styles.starIcon}
        />
      </div>
    );
  }

  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Image
          key={i}
          src={i < rating ? '/icons/star_pressed.svg' : '/icons/star.svg'}
          alt={i < rating ? 'Filled star' : 'Empty star'}
          width={size}
          height={size}
          className={styles.starIcon}
        />
      ))}
    </div>
  );
}
