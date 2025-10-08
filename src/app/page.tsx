'use client';
import styles from './page.module.css';
import Button from '@/components/UI/Button/Button';

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <div className={styles.herocontent}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <h2 className={styles.subject}>
          You can find everything you want in our catalog
        </h2>
        <Button text="View Now" route="/catalog" />
      </div>
    </section>
  );
}
