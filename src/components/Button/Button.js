import React from 'react';
import styles from './Button.module.css';

export default function Button({ children, onBtnClick }) {
  return (
    <button type="text" className={styles.btn} onClick={onBtnClick}>
      {children}
    </button>
  );
}
