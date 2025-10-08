'use client';

import { useEffect } from 'react';
import { useCampersStore } from '@/store/useCampersStore';
import { CamperCard } from '@/components/CamperCard/CamperCard';
import { CamperFilters } from '@/components/CamperFilters/CamperFilters';
import styles from './catalogpage.module.css';

export default function CatalogPage() {
  const { campers, fetchCampers, loading, error } = useCampersStore();

  useEffect(() => {
    fetchCampers(true);
  }, [fetchCampers]);

  return (
    <div className={styles.wrapper}>
      <CamperFilters />

      <div className={styles.list}>
        {loading && <p>Завантаження...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>
    </div>
  );
}
