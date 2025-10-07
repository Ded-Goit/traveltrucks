'use client';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function HomePage() {
  const router = useRouter();

  return (
    <section className={styles.hero}>
      <div className={styles.herocontent}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <h2 className={styles.subject}>
          You can find everything you want in our catalog
        </h2>
        <button onClick={() => router.push('/catalog')} className={styles.btn}>
          View Now
        </button>
      </div>
    </section>
  );
}
