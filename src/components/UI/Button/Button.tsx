'use client';

import Link from 'next/link';
import styles from './Button.module.css';
import { FC } from 'react';

interface ButtonProps {
  text: string;
  route?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const Button: FC<ButtonProps> = ({ text, route, onClick, type = 'button' }) => {
  // Якщо передано route → використовуємо Link (Next.js)
  if (route) {
    return (
      <Link href={route} className={styles.btn}>
        {text}
      </Link>
    );
  }

  // Якщо є onClick → звичайна кнопка
  return (
    <button onClick={onClick} type={type} className={styles.btn}>
      {text}
    </button>
  );
};

export default Button;
