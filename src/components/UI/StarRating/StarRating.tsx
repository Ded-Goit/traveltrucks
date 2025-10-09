'use client';

import Image from 'next/image';
import styles from './StarRating.module.css';

interface StarRatingProps {
  rating: number; // поточна оцінка (1–5)
  size?: number; // опціонально — розмір іконки
}

export default function StarRating({ rating, size = 20 }: StarRatingProps) {
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
