'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCampersStore } from '@/store/useCampersStore';
import Button from '@/components/UI/Button/Button';
import { AMENITIES, VEHICLE_TYPES } from '@/constants/camperFeatures';
import styles from './CamperFilters.module.css';

export function CamperFilters() {
  const { setFilters, fetchCampers, loading } = useCampersStore();

  const [location, setLocation] = useState('');
  const [form, setForm] = useState('');
  const [features, setFeatures] = useState<string[]>([]);

  // Use only certain features for the filter
  const filterableAmenities = AMENITIES.filter((a) =>
    ['AC', 'transmission', 'kitchen', 'TV', 'bathroom'].includes(a.key),
  );

  const toggleFeature = (key: string) => {
    setFeatures((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key],
    );
  };

  const toggleForm = (value: string) => {
    setForm((prev) => (prev === value ? '' : value));
  };

  const applyFilters = async () => {
    const filters: Record<string, string | boolean> = {};

    if (location) filters.location = location;
    if (form) filters.form = form;

    features.forEach((f) => {
      if (f === 'transmission') filters.transmission = 'automatic';
      else filters[f] = true;
    });

    setFilters(filters);
    await fetchCampers(true);
  };

  return (
    <div className={styles.filters}>
      {/* Location */}
      <div className={styles.locationWrapper}>
        <label className={styles.label}>Location</label>
        <div className={styles.locationInput}>
          <Image src="/icons/map.svg" alt="map" width={20} height={20} />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Kyiv, Ukraine"
          />
        </div>
      </div>

      {/* Equipment */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Vehicle equipment</h3>
        <div className={styles.iconGrid}>
          {filterableAmenities.map((a) => (
            <button
              key={a.key}
              type="button"
              className={`${styles.iconButton} ${
                features.includes(a.key) ? styles.active : ''
              }`}
              onClick={() => toggleFeature(a.key)}
            >
              <Image src={a.icon} alt={a.label} width={32} height={32} />
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Type */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Vehicle type</h3>
        <div className={styles.iconGrid}>
          {VEHICLE_TYPES.map((v) => (
            <button
              key={v.key}
              type="button"
              className={`${styles.iconButton} ${
                form === v.key ? styles.active : ''
              }`}
              onClick={() => toggleForm(v.key)}
            >
              <Image src={v.icon} alt={v.label} width={32} height={32} />
              <span>{v.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <div className={styles.btnContainer}>
        <Button
          text={loading ? 'Loading...' : 'Search'}
          onClick={applyFilters}
        />
      </div>
    </div>
  );
}
