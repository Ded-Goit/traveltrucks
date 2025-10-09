'use client';

import Image from 'next/image';
import styles from './CamperInfoRow.module.css';
import StarRating from '@/components/UI/StarRating/StarRating';

interface CamperInfoRowProps {
  rating: number; // рейтинг кемпера, наприклад 4.4
  reviewsCount: number; // кількість відгуків
  location: string; // розташування
}

export default function CamperInfoRow({
  rating,
  reviewsCount,
  location,
}: CamperInfoRowProps) {
  return (
    <div className={styles.infoRow}>
      <div className={styles.ratingWrapper}>
        <StarRating rating={rating} size={16} singleStar />
        <span className={styles.ratingText}>
          {rating.toFixed(1)} ({reviewsCount} Reviews)
        </span>
      </div>

      <div className={styles.locationWrapper}>
        <Image
          src="/icons/map.svg"
          alt="Location"
          width={16}
          height={16}
          className={styles.icon}
        />
        <span className={styles.locationText}>{location}</span>
      </div>
    </div>
  );
}
