'use client';

import { useCampersStore } from '@/store/useCampersStore';
import Loader from '@/components/Loader/Loader';
import styles from './GlobalLoader.module.css';

export default function GlobalLoader() {
  const { loading } = useCampersStore();

  if (!loading) return null;

  return (
    <div className={styles.overlay}>
      <Loader />
    </div>
  );
}
