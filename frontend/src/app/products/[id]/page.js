import styles from '../productDetails.module.css';
import Link from 'next/link';

export default async function ProductDetails({ params }) {
  const res = await fetch(`http://localhost:4000/api/products/${params.id}`);
  if (!res.ok) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <p>Product not found.</p>
          <Link href="/products" className={styles.backLink}>&larr; Back to Products</Link>
        </div>
      </div>
    );
  }
  const product = await res.json();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link href="/products" className={styles.backLink}>&larr; Back to Products</Link>
        <img src={product.image} alt={product.name} className={styles.image} />
        <div className={styles.info}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.category}>{product.category}</p>
          <p className={styles.price}>₹{product.price}</p>
          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
    </div>
  );
} 