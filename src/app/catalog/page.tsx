'use client';

import { useEffect } from 'react';
import { useCampersStore } from '@/store/campersStore';
import CamperCard from '@/components/CamperCard/CamperCard';
import FilterPanel from '@/components/FilterPanel/FilterPanel';
import Loader from '@/components/Loader/Loader';
import styles from './catalogpage.module.css';

export default function CatalogPage() {
  const { campers, loading, error, fetchCampers, hasMore, loadMore } =
    useCampersStore();

  // Отримуємо кемпери при першому рендері
  useEffect(() => {
    fetchCampers();
  }, [fetchCampers]);

  return (
    <section className={styles.catalog}>
      <div className={styles.container}>
        <FilterPanel />

        <div className={styles.listWrapper}>
          {loading && <Loader />}

          {!loading && error && <p className={styles.error}>❌ {error}</p>}

          {!loading && Array.isArray(campers) && campers.length === 0 && (
            <p className={styles.empty}>No campers found</p>
          )}

          {!loading && Array.isArray(campers) && campers.length > 0 && (
            <div className={styles.list}>
              {campers.map((c) => (
                <CamperCard key={c.id} camper={c} />
              ))}
            </div>
          )}

          {!loading && hasMore && (
            <button className={styles.loadMore} onClick={loadMore}>
              Load More
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
