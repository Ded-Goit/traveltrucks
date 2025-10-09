'use client';

import { useEffect } from 'react';
import { useCampersStore } from '@/store/useCampersStore';
import { CamperCard } from '@/components/CamperCard/CamperCard';
import { CamperFilters } from '@/components/CamperFilters/CamperFilters';
import styles from './catalogpage.module.css';

export default function CatalogPage() {
  const { campers, fetchCampers, loadMore, loading, error } = useCampersStore();

  useEffect(() => {
    fetchCampers(true);
  }, [fetchCampers]);

  return (
    <div className={styles.wrapper}>
      <CamperFilters />

      <div className={styles.list}>
        {loading && campers.length === 0 && <p>Завантаження...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
        {/* Кнопка "Load More" */}
        <div className={styles.loadMoreContainer}>
          {campers.length > 0 && campers.length % 4 === 0 && !loading && (
            <button onClick={loadMore} className={styles.loadMoreBtn}>
              Load More
            </button>
          )}
          {loading && campers.length > 0 && <p>Завантаження...</p>}
        </div>
      </div>
    </div>
  );
}
