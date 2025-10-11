'use client';
import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onClose,
}) => {
  if (!message) return null;

  return (
    <div className={styles.errorBox} role="alert">
      <span>{message}</span>
      {onClose && (
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close message"
        >
          ×
        </button>
      )}
    </div>
  );
};
