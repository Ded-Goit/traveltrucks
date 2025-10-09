'use client';

import Image from 'next/image';
import { useCampersStore } from '@/store/useCampersStore';
import type { Camper } from '@/types/camper';
import Button from '../UI/Button/Button';
import CamperInfoRow from '../UI/CamperInfoRow/CamperInfoRow';
import { formatPrice } from '@/utils/formatPrice';
import { getAvailableAmenities } from '@/utils/filterAmenities';
import styles from './CamperCard.module.css';

interface CamperCardProps {
  camper: Camper;
}

export function CamperCard({ camper }: CamperCardProps) {
  const { favorites, toggleFavorite } = useCampersStore();
  const isFavorite = favorites.includes(camper.id);

  const imageSrc = camper.gallery?.[0]?.thumb || '/default-camper.jpg';
  const availableAmenities = getAvailableAmenities(camper);

  return (
    <div className={styles.card}>
      {/* Фото кемпера */}
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={camper.name}
          width={292}
          height={320}
          className={styles.image}
          priority
        />
      </div>

      {/* Інформація */}
      <div className={styles.info}>
        <div>
          <div className={styles.topRow}>
            <h2>{camper.name}</h2>
            <div className={styles.priceRow}>
              <h2>{formatPrice(camper.price)}</h2>

              {/* Кнопка "В обране" */}
              <button
                className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
                onClick={() => toggleFavorite(camper.id)}
                title={isFavorite ? 'Видалити з обраного' : 'Додати в обране'}
              >
                <Image
                  src={
                    isFavorite ? '/icons/heart_pressed.svg' : '/icons/heart.svg'
                  }
                  alt="favorite"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>

          <CamperInfoRow
            rating={camper.rating}
            reviewsCount={camper.reviews.length}
            location={camper.location}
          />
        </div>

        <p className={styles.description}>
          {camper.description?.slice(0, 64)}...
        </p>

        {/* Зручності */}
        <div className={styles.tags}>
          {availableAmenities.map((a) => (
            <span key={a.key} className={styles.tag}>
              <Image
                src={a.icon}
                alt={a.label}
                width={20}
                height={20}
                className={styles.icon}
              />
              {a.key === 'engine'
                ? camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1)
                : a.label}
            </span>
          ))}
        </div>

        <div className={styles.footer}>
          <Button text="Show more" route={`/catalog/${camper.id}`} />
        </div>
      </div>
    </div>
  );
}
