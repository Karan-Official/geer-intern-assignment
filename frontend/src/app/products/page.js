"use client";
import React, { useState, useEffect } from 'react';
import styles from './products.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:4000/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesName = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    return matchesName && matchesCategory;
  });

  return (
    <div className={styles.bgWrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Products</h1>
        <p className={styles.subtitle}>Discover our best deals and latest arrivals</p>
        <div className={styles.filtersBlock}>
          <span className={styles.filtersTitle}>Filter & Search</span>
          <div className={styles.filters}>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.search}
            />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className={`${styles.select} ${styles.pointer}`}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        {loading ? (
          <div className={styles.noResults}>Loading products...</div>
        ) : error ? (
          <div className={styles.noResults}>Error: {error}</div>
        ) : (
          <div className={styles.grid}>
            {filteredProducts.length === 0 && (
              <div className={styles.noResults}>No products found.</div>
            )}
            {filteredProducts.map(product => (
              <Link href={`/products/${product.id}`} key={product.id} className={styles.card}>
                <div className={styles.cardImageWrap}>
                  <img src={product.image} alt={product.name} className={styles.image} />
                </div>
                <div className={styles.info}>
                  <h2 className={styles.name}>{product.name}</h2>
                  <p className={styles.price}>₹{product.price}</p>
                  {product.description && (
                    <p className={styles.description}>
                      {product.description.length > 60 ? (
                        <>
                          {product.description.slice(0, 60)}...{' '}
                          <span
                            className={styles.readMore}
                            onClick={e => {
                              e.preventDefault();
                              router.push(`/products/${product.id}`);
                            }}
                          >
                            Read more
                          </span>
                        </>
                      ) : (
                        product.description
                      )}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 