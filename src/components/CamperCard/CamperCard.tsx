'use client';
import { formatPrice } from '@/utils/formatPrice';
import { Camper } from '@/types/camper';
import styles from './CamperCard.module.css';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Props {
  camper: Camper;
}

export default function CamperCard({ camper }: Props) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  return (
    <div className={styles.card}>
      <Image
        src={camper.gallery[0]?.thumb || '/noimage.jpg'}
        alt={camper.name}
        width={290}
        height={310}
        className={styles.image}
      />

      <div className={styles.info}>
        <div className={styles.header}>
          <h3>{camper.name}</h3>
          <div className={styles.price}>
            {formatPrice(camper.price)}
            <button
              onClick={() => toggleFavorite(camper)}
              className={`${styles.favorite} ${
                isFavorite(camper.id) ? styles.active : ''
              }`}
              aria-label="Add to favorites"
            >
              ♥
            </button>
          </div>
        </div>

        <p className={styles.location}>{camper.location}</p>
        <p className={styles.desc}>{camper.description}</p>

        <ul className={styles.features}>
          {camper.AC && <li>AC</li>}
          {camper.kitchen && <li>Kitchen</li>}
          {camper.transmission && <li>{camper.transmission}</li>}
        </ul>

        <button
          className={styles.showMore}
          onClick={() => router.push(`/catalog/${camper.id}`)}
        >
          Show more
        </button>
      </div>
    </div>
  );
}
