'use client';
import styles from './FilterPanel.module.css';
//import { useCampersStore } from '@/store/campersStore';
//import { useState } from 'react';

export default function FilterPanel() {
  return (
    <div className={styles.panel}>
      <h3>Location</h3>
      <input type="text" placeholder="City..." className={styles.input} />

      <h3>Vehicle equipment</h3>
      <div className={styles.equipment}>
        <label>
          <input type="checkbox" />
          AC
        </label>
        <label>
          <input type="checkbox" />
          Kitchen
        </label>
      </div>

      <h3>Vehicle type</h3>
      <div className={styles.type}>
        <label>
          <input type="radio" name="form" />
          Van
        </label>
        <label>
          <input type="radio" name="form" />
          Fully Integrated
        </label>
      </div>

      <button className={styles.search}>Search</button>
    </div>
  );
}
