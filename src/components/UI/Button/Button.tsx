'use client';
import { useRouter } from 'next/navigation';
import styles from './Button.module.css';
import { FC } from 'react';

interface ButtonProps {
  text: string;
  route?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ text, route, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (route) {
      router.push(route);
    }
  };

  return (
    <button onClick={handleClick} className={styles.btn}>
      {text}
    </button>
  );
};

export default Button;
