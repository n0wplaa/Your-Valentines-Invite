'use client';

import { useEffect, useState } from 'react';
import loveConfig from '@/config/loveConfig';
import styles from './TimeCounter.module.css';

interface TimeLeft {
  ДНЕЙ: number;
  ЧАСОВ: number;
  МИНУТ: number;
  СЕКУНД: number;
}

export default function TimeCounter() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, МИНУТ: 0, СЕКУНД: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      // Parse the relationship start date (Singapore timezone)
      const startDate = new Date(loveConfig.relationshipStart);
      const now = new Date();
      
      // Calculate difference in milliseconds
      const difference = now.getTime() - startDate.getTime();

      if (difference > 0) {
        const ДНЕЙ = Math.floor(difference / (1000 * 60 * 60 * 24));
        const ЧАСОВ = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const МИНУТ = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const СЕКУНД = Math.floor((difference % (1000 * 60)) / 1000);

        return { ДНЕЙ, ЧАСОВ, МИНУТ, СЕКУНД };
      }

      return { ДНЕЙ: 0, ЧАСОВ: 0, МИНУТ: 0, СЕКУНД: 0 };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <section className={styles.counterSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>⏰</div>
          <h2 className={styles.title}>Время, что мы вместе</h2>
          <p className={styles.subtitle}>
            Каждая секунда с тобой — сокровище
          </p>

          <div className={styles.counterGrid}>
            <div className={styles.timeBox}>
              <div className={styles.timeValue}>{timeLeft.ДНЕЙ}</div>
              <div className={styles.timeLabel}>ДНЕЙ</div>
              <div className={styles.timeIcon}>📅</div>
            </div>

            <div className={styles.timeBox}>
              <div className={styles.timeValue}>{timeLeft.ЧАСОВ}</div>
              <div className={styles.timeLabel}>ЧАСОВ</div>
              <div className={styles.timeIcon}>🕐</div>
            </div>

            <div className={styles.timeBox}>
              <div className={styles.timeValue}>{timeLeft.minutes}</div>
              <div className={styles.timeLabel}>Minutes</div>
              <div className={styles.timeIcon}>⏱️</div>
            </div>

            <div className={styles.timeBox}>
              <div className={styles.timeValue}>{timeLeft.seconds}</div>
              <div className={styles.timeLabel}>Seconds</div>
              <div className={styles.timeIcon}>⚡</div>
            </div>
          </div>

          <p className={styles.message}>
            ...и это только начало! Впереди бесконечность моментов вместе💕
          </p>
        </div>
      </div>
    </section>
  );
}
