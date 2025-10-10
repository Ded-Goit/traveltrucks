'use client';

import Image from 'next/image';
import styles from './CamperInfoRow.module.css';
import StarRating from '@/components/UI/StarRating/StarRating';

interface CamperInfoRowProps {
  rating: number;
  reviewsCount: number;
  location: string;
  inlineLocation?: boolean;
}

export default function CamperInfoRow({
  rating,
  reviewsCount,
  location,
  inlineLocation = false,
}: CamperInfoRowProps) {
  const parts = location.split(',').map((s) => s.trim());
  const [country, city] = parts.length === 2 ? parts : ['', location];
  const formattedLocation = city && country ? `${city}, ${country}` : location;

  return (
    <div
      className={`${styles.infoRow} ${
        inlineLocation ? styles.inlineLocation : ''
      }`}
    >
      <div className={styles.ratingWrapper}>
        <StarRating rating={rating} size={16} singleStar />
        <span className={styles.ratingText}>
          {rating.toFixed(1)} ({reviewsCount} Reviews)
        </span>

        {inlineLocation && (
          <div className={`${styles.locationWrapper} ${styles.inline}`}>
            <Image
              src="/icons/map.svg"
              alt="Location"
              width={16}
              height={16}
              className={styles.icon}
            />
            <span className={styles.locationText}>{formattedLocation}</span>
          </div>
        )}
      </div>

      {!inlineLocation && (
        <div className={styles.locationWrapper}>
          <Image
            src="/icons/map.svg"
            alt="Location"
            width={16}
            height={16}
            className={styles.icon}
          />
          <span className={styles.locationText}>{formattedLocation}</span>
        </div>
      )}
    </div>
  );
}
