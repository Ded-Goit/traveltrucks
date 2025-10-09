'use client';

import Image from 'next/image';
import { useCampersStore } from '@/store/useCampersStore';
import type { Camper } from '@/types/camper';
import Button from '../UI/Button/Button';
import styles from './CamperCard.module.css';
import { formatPrice } from '@/utils/formatPrice';
import CamperInfoRow from '../UI/CamperInfoRow/CamperInfoRow';

interface CamperCardProps {
  camper: Camper;
}

export function CamperCard({ camper }: CamperCardProps) {
  const { favorites, toggleFavorite } = useCampersStore();
  const isFavorite = favorites.includes(camper.id);

  const imageSrc = camper.gallery?.[0]?.thumb || '/default-camper.jpg';

  const amenities = [
    { key: 'transmission', label: 'Automatic', icon: '/icons/diagram.svg' },
    { key: 'AC', label: 'AC', icon: '/icons/wind.svg' },
    { key: 'engine', label: 'Petrol', icon: '/icons/fuel-pump.svg' },
    { key: 'kitchen', label: 'Kitchen', icon: '/icons/cup-hot.svg' },
    { key: 'bathroom', label: 'Bathroom', icon: '/icons/ph_shower.svg' },
    { key: 'TV', label: 'TV', icon: '/icons/tv.svg' },
    { key: 'radio', label: 'Radio', icon: '/icons/ui-radios.svg' },
    {
      key: 'refrigerator',
      label: 'Fridge',
      icon: '/icons/solar_fridge-outline.svg',
    },
    {
      key: 'microwave',
      label: 'Microwave',
      icon: '/icons/lucide_microwave.svg',
    },
    { key: 'gas', label: 'Gas', icon: '/icons/hugeicons_gas-stove.svg' },
    { key: 'water', label: 'Water', icon: '/icons/ion_water-outline.svg' },
  ];

  //  Фільтруємо доступні зручності для конкретного кемпера
  const availableAmenities = amenities.filter((a) => {
    if (a.key === 'transmission') {
      return camper.transmission === 'automatic';
    }
    if (a.key === 'engine') {
      return !!camper.engine;
    }
    return camper[a.key as keyof Camper] === true;
  });

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

      {/* Інформація про кемпер */}
      <div className={styles.info}>
        <div>
          <div className={styles.topRow}>
            <h2>{camper.name}</h2>
            <div className={styles.priceRow}>
              <h2>{formatPrice(camper.price)}</h2>
              {/* Кнопка "в обране" */}
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
        {/* Динамічні зручності */}
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
