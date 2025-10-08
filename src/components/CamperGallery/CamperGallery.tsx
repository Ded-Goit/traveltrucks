'use client';
import Image from 'next/image';
import type { CamperImage } from '@/types/camper';
import styles from './CamperGallery.module.css';

interface CamperGalleryProps {
  images: CamperImage[];
}

export function CamperGallery({ images }: CamperGalleryProps) {
  if (!images || images.length === 0) {
    return <p>Немає фотографій для цього кемпера.</p>;
  }

  return (
    <div className={styles.gallery}>
      {images.map((img, idx) => (
        <div key={idx} className={styles.imageWrapper}>
          <Image
            src={img.thumb}
            alt={`Camper image ${idx + 1}`}
            width="292"
            height="320"
            className={styles.image}
            loading={idx === 0 ? 'eager' : 'lazy'} // перше зображення швидше
          />
        </div>
      ))}
    </div>
  );
}
