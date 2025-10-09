'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCampersStore } from '@/store/useCampersStore';
import Button from '@/components/UI/Button/Button';
import styles from './CamperFilters.module.css';

export function CamperFilters() {
  const { setFilters, fetchCampers, loading } = useCampersStore();

  const [location, setLocation] = useState('');
  const [form, setForm] = useState('');
  const [features, setFeatures] = useState<string[]>([]);

  const amenities = [
    { key: 'AC', label: 'AC', icon: '/icons/wind.svg' },
    {
      key: 'automatic',
      label: 'Automatic',
      icon: '/icons/diagram.svg',
    },
    { key: 'kitchen', label: 'Kitchen', icon: '/icons/cup-hot.svg' },
    { key: 'TV', label: 'TV', icon: '/icons/tv.svg' },
    {
      key: 'bathroom',
      label: 'Bathroom',
      icon: '/icons/ph_shower.svg',
    },
    /*{
      key: 'engine',
      label: 'Petrol',
      icon: '/icons/fuel-pump.svg',
    },
    { key: 'radio', label: 'Radio', icon: '/icons/ui-radios.svg' },
    {
      key: 'refrigerator',
      label: 'Refrigerator',
      icon: '/icons/solar_fridge-outline.svg',
    },
    {
      key: 'microwave',
      label: 'Microwave',
      icon: '/icons/lucide_microwave.svg',
    },
    {
      key: 'gas',
      label: 'Gas',
      icon: '/icons/hugeicons_gas-stove.svg',
    },
    {
      key: 'water',
      label: 'Water',
      icon: '/icons/ion_water-outline.svg',
    },*/
  ];

  const vehicleTypes = [
    { key: 'panelTruck', label: 'Van', icon: '/icons/bi_grid-1x2.svg' },
    {
      key: 'fullyIntegrated',
      label: 'Fully Integrated',
      icon: '/icons/bi_grid.svg',
    },
    { key: 'alcove', label: 'Alcove', icon: '/icons/bi_grid-3x3-gap.svg' },
  ];

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

    // звичайні фічі (AC, kitchen, bathroom і т.д.)
    features.forEach((f) => {
      if (f === 'automatic') {
        filters.transmission = 'automatic'; // ✅ правильний ключ
      } else {
        filters[f] = true;
      }
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
          {amenities.map((a) => (
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

      {/* Type */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Vehicle type</h3>
        <div className={styles.iconGrid}>
          {vehicleTypes.map((v) => (
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

      {/* Search Button (універсальний компонент) */}
      <div className={styles.btnContainer}>
        <Button
          text={loading ? 'Loading...' : 'Search'}
          onClick={applyFilters}
        />
      </div>
    </div>
  );
}
