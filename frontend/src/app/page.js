import styles from './home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Geer.in Clone</h1>
        <p className={styles.subtitle}>A modern, high-performance e-commerce platform. Discover amazing products at great prices!</p>
        <Link href="/products" className={styles.cta}>Browse Products</Link>
      </div>
    </main>
  );
}
