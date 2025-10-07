/*import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';

export default function Header() {
  return (
    <header className={styles.header}>
      <Image
        src="/logo.svg"
        alt="TravelTrucks logo"
        width={136}
        height={16}
        priority // логотип вантажиться першим
      />
      <nav
        className={styles.headernav}
        style={{ display: 'flex', gap: '20px' }}
      >
        <Link href="/">Home</Link>
        <Link href="/catalog">Catalog</Link>
      </nav>
    </header>
  );
}*/
'use client';
import Link from 'next/link';
import styles from './Header.module.css';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.svg"
            alt="TravelTrucks logo"
            width={136}
            height={16}
            priority // логотип вантажиться першим
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
    </header>
  );
}
