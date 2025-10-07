'use client';
import Link from 'next/link';
import styles from './Header.module.css';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();

  return (
    <div className={styles.header}>
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="TravelTrucks logo"
          width={136}
          height={16}
          className={styles.logo}
          priority
        />
      </Link>
      <nav className={styles.nav}>
        <Link
          href="/"
          className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
        >
          Home
        </Link>
        <Link
          href="/catalog"
          className={`${styles.link} ${
            pathname.startsWith('/catalog') ? styles.active : ''
          }`}
        >
          Catalog
        </Link>
      </nav>
    </div>
  );
}
