'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Camper } from '@/types/camper';
import styles from './CamperDetails.module.css';
import DatePickerInput from '../UI/DatePickerInput/DatePickerInput';
import StarRating from '../UI/StarRating/StarRating';
import CamperInfoRow from '../UI/CamperInfoRow/CamperInfoRow';
import { AMENITIES } from '@/constants/camperFeatures';

interface CamperDetailsProps {
  camper: Camper;
}

export default function CamperDetails({ camper }: CamperDetailsProps) {
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>(
    'features',
  );

  const gallery = camper.gallery || [];

  return (
    <section className={styles.details}>
      <div className={styles.header}>
        <h2 className={styles.name}>{camper.name}</h2>
        <CamperInfoRow
          rating={camper.rating}
          reviewsCount={camper.reviews.length}
          location={camper.location}
          inlineLocation
        />
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
                {AMENITIES.map(({ key, label, icon }) => {
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
                <h3>Vehicle details</h3>
                <ul>
                  <li></li>
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
                  <div className={styles.reviewHeader}>
                    <div className={styles.avatar}>
                      {review.reviewer_name[0]}
                    </div>
                    <div className={styles.reviewerInfo}>
                      <strong className={styles.reviewerName}>
                        {review.reviewer_name}
                      </strong>
                      <StarRating rating={review.reviewer_rating} />
                    </div>
                  </div>
                  <p className={styles.comment}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — Booking form */}
        <div className={styles.rightColumn}>
          <h3>Book your campervan now</h3>
          <p className={styles.subtext}>
            Stay connected! We are always ready to help you.
          </p>

          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              alert('Camper booked successfully!');
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
