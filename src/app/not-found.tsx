'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Loader from '@/components/Loader/Loader';
import Button from '@/components/UI/Button/Button';
import styles from './not-found.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/cemper.png"
            alt="Camper"
            width={180}
            height={180}
            priority
            className={styles.icon}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Oops! The page you’re looking for doesn’t exist or is still under
          construction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={styles.loaderWrapper}
        >
          <Loader />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.btnWrapper}
        >
          <Button text="Back to Catalog" route="/catalog" />
        </motion.div>
      </main>
    </div>
  );
}
