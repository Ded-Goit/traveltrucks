'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Camper } from '@/types/camper';
import styles from './CamperDetails.module.css';
import DatePickerInput from '../UI/DatePickerInput/DatePickerInput';
import StarRating from '../UI/StarRating/StarRating';

interface CamperDetailsProps {
  camper: Camper;
}

export default function CamperDetails({ camper }: CamperDetailsProps) {
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>(
    'features',
  );

  const gallery = camper.gallery || [];
  const amenities = [
    { key: 'AC', label: 'AC', icon: '/icons/wind.svg' },
    { key: 'transmission', label: 'Automatic', icon: '/icons/diagram.svg' },
    { key: 'kitchen', label: 'Kitchen', icon: '/icons/cup-hot.svg' },
    { key: 'TV', label: 'TV', icon: '/icons/tv.svg' },
    { key: 'bathroom', label: 'Bathroom', icon: '/icons/ph_shower.svg' },
    { key: 'engine', label: 'Petrol', icon: '/icons/fuel-pump.svg' },
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
    { key: 'gas', label: 'Gas', icon: '/icons/hugeicons_gas-stove.svg' },
    { key: 'water', label: 'Water', icon: '/icons/ion_water-outline.svg' },
  ];

  return (
    <section className={styles.details}>
      <div className={styles.header}>
        <h2 className={styles.name}>{camper.name}</h2>
        <div className={styles.infoRow}>
          <span className={styles.rating}>
            <Image
              src="/icons/star_pressed.svg"
              alt="Star"
              width={16}
              height={16}
              className={styles.smallIcon}
            />
            <span className={styles.ratingNumber}>
              {camper.rating.toFixed(1)}
            </span>
            <span className={styles.reviewCount}>
              ({camper.reviews?.length || 0} Reviews)
            </span>
          </span>

          <span className={styles.location}>
            <Image
              src="/icons/map.svg"
              alt="Location"
              width={16}
              height={16}
              className={styles.smallIcon}
            />
            <span>{camper.location}</span>
          </span>
        </div>
        <p className={styles.price}>€{camper.price.toFixed(2)}</p>
      </div>

      <div className={styles.gallery}>
        {gallery.map((img, idx) => (
          <Image
            key={idx}
            src={img.thumb || img.original}
            alt={`${camper.name} image ${idx + 1}`}
            width={280}
            height={200}
            className={styles.image}
          />
        ))}
      </div>

      <p className={styles.description}>{camper.description}</p>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'features' ? styles.active : ''}`}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className={styles.content}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          {activeTab === 'features' ? (
            <>
              <div className={styles.tags}>
                {amenities.map(({ key, label, icon }) => {
                  if (!camper[key as keyof typeof camper]) return null;

                  return (
                    <span key={key} className={styles.tag}>
                      <Image
                        src={icon}
                        alt={label}
                        width={16}
                        height={16}
                        className={styles.tagIcon}
                      />
                      {label}
                    </span>
                  );
                })}
              </div>
              <div className={styles.detailsBox}>
                <h4>Vehicle details</h4>
                <ul>
                  <li>
                    <span>Form</span>
                    <span>{camper.form}</span>
                  </li>
                  <li>
                    <span>Length</span>
                    <span>{camper.length}</span>
                  </li>
                  <li>
                    <span>Width</span>
                    <span>{camper.width}</span>
                  </li>
                  <li>
                    <span>Height</span>
                    <span>{camper.height}</span>
                  </li>
                  <li>
                    <span>Tank</span>
                    <span>{camper.tank}</span>
                  </li>
                  <li>
                    <span>Consumption</span>
                    <span>{camper.consumption}</span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className={styles.reviews}>
              {camper.reviews?.map((review, idx) => (
                <div key={idx} className={styles.reviewCard}>
                  <div className={styles.avatar}>{review.reviewer_name[0]}</div>
                  <div className={styles.reviewContent}>
                    <strong>{review.reviewer_name}</strong>
                    <StarRating rating={review.reviewer_rating} />
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — Booking form */}
        <div className={styles.rightColumn}>
          <h4>Book your campervan now</h4>
          <p className={styles.subtext}>
            Stay connected! We are always ready to help you.
          </p>

          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              alert('✅ Camper booked successfully!');
            }}
          >
            <input type="text" placeholder="Name*" required />
            <input type="email" placeholder="Email*" required />
            <DatePickerInput />
            <textarea placeholder="Comment" rows={3}></textarea>
            <button type="submit" className={styles.submit}>
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
