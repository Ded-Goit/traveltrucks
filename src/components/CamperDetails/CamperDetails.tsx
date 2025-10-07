'use client';
import { Camper } from '@/types/camper';
import styles from './CamperDetails.module.css';
import Image from 'next/image';

interface Props {
  camper: Camper;
}

export default function CamperDetails({ camper }: Props) {
  return (
    <section className={styles.details}>
      <h1>{camper.name}</h1>
      <p className={styles.location}>{camper.location}</p>
      <p className={styles.price}>€{camper.price.toFixed(2)}</p>

      <div className={styles.gallery}>
        {camper.gallery.slice(0, 4).map((img) => (
          <Image
            key={img.thumb}
            src={img.thumb}
            alt={camper.name}
            width={290}
            height={310}
          />
        ))}
      </div>

      <p className={styles.desc}>{camper.description}</p>

      <div className={styles.tabs}>
        <p>storinka</p>
      </div>
    </section>
  );
}
