/*'use client';
import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const rotation = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      rotation.current = angle;

      cursor.animate(
        {
          transform: `translate(${e.clientX}px, ${e.clientY}px) rotate(${angle}deg)`,
        },
        { duration: 200, fill: 'forwards', easing: 'ease-out' },
      );

      lastX.current = e.clientX;
      lastY.current = e.clientY;
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return <div ref={cursorRef} className={styles.cursor} />;
}*/
'use client';
import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let angle = 0;

    const update = () => {
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;
      cursor.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
      raf.current = requestAnimationFrame(update);
    };
    update();

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      const dx = targetX - last.current.x;
      const dy = targetY - last.current.y;
      angle = Math.atan2(dy, dx) * (180 / Math.PI);
      last.current = { x: targetX, y: targetY };
    };

    // Зміна курсора при hover на "pointer"
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const style = window.getComputedStyle(target);
      if (style.cursor === 'pointer') {
        cursor.classList.add(styles.active);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const style = window.getComputedStyle(target);
      if (style.cursor === 'pointer') {
        cursor.classList.remove(styles.active);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(raf.current!);
    };
  }, []);

  return (
    <div ref={cursorRef} className={styles.cursor}>
      <div className={styles.trail}></div>
      <div className={styles.trail}></div>
      <div className={styles.trail}></div>
    </div>
  );
}
