'use client';

import { useEffect } from 'react';
import { useCampersStore } from '@/store/useCampersStore';
import { CamperCard } from '@/components/CamperCard/CamperCard';
import { CamperFilters } from '@/components/CamperFilters/CamperFilters';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import styles from './page.module.css';

export default function CatalogPage() {
  const { campers, fetchCampers, loadMore, loading, error, clearError } =
    useCampersStore();

  useEffect(() => {
    clearError(); // clear the old error before the new request
    fetchCampers(true);
  }, [fetchCampers, clearError]);

  return (
    <div className={styles.wrapper}>
      <CamperFilters />

      <div className={styles.list}>
        {loading && campers.length === 0 && <p>Loading...</p>}

        {/* Error display */}
        {error && <ErrorMessage message={error} onClose={clearError} />}

        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}

        {/* "Load More" button */}
        <div className={styles.loadMoreContainer}>
          {campers.length > 0 && campers.length % 4 === 0 && !loading && (
            <button onClick={loadMore} className={styles.loadMoreBtn}>
              Load More
            </button>
          )}
          {loading && campers.length > 0 && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}
