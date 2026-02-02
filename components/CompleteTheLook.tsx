import React from 'react';
import { motion } from 'framer-motion';
import { theme, placeholderMedia } from '../theme';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface CompleteTheLookProps {
  currentProductId: string;
  currentCategory: string;
}

export const CompleteTheLook: React.FC<CompleteTheLookProps> = ({ 
  currentProductId, 
  currentCategory 
}) => {
  // Placeholder recommended products
  // In real implementation, these would come from API based on category/tags
  const recommendedProducts: Product[] = [
    {
      id: 'rec-1',
      name: 'Wireless Earbuds Pro',
      price: 89.99,
      description: 'Crystal clear sound',
      image: placeholderMedia.images.earbudsBlack,
      images: [placeholderMedia.images.earbudsBlack],
      category: 'Earbuds',
    },
    {
      id: 'rec-2',
      name: 'Fast Charger',
      price: 29.99,
      description: 'Quick charge technology',
      image: placeholderMedia.images.charger,
      images: [placeholderMedia.images.charger],
      category: 'Chargers',
    },
    {
      id: 'rec-3',
      name: 'Portable Speaker',
      price: 79.99,
      description: '360° sound experience',
      image: placeholderMedia.images.speakerBlack,
      images: [placeholderMedia.images.speakerBlack],
      category: 'Speakers',
    },
  ];

  return (
    <section style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.heading}>Complete the Look</h3>
        <p style={styles.subheading}>
          Buy together & save 15% on your bundle
        </p>
      </div>

      <div style={styles.grid}>
        {recommendedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <ProductCard product={product} />
            <button style={styles.addButton}>
              + Add to Bundle
            </button>
          </motion.div>
        ))}
      </div>

      <div style={styles.bundleBar}>
        <div style={styles.bundleInfo}>
          <span style={styles.bundleIcon}>🎁</span>
          <span style={styles.bundleText}>
            Add 2+ items and get <strong>15% off</strong> automatically
          </span>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: `${theme.spacing[12]} 0`,
    borderTop: `2px solid ${theme.colors.gray[200]}`,
    marginTop: theme.spacing[12],
  },

  header: {
    textAlign: 'center',
    marginBottom: theme.spacing[8],
  },

  heading: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
    marginBottom: theme.spacing[2],
  },

  subheading: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.semibold,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing[6],
    marginBottom: theme.spacing[8],
  },

  addButton: {
    width: '100%',
    marginTop: theme.spacing[3],
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    backgroundColor: 'transparent',
    border: `2px solid ${theme.colors.primary}`,
    borderRadius: theme.borderRadius.lg,
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    cursor: 'pointer',
    transition: `all ${theme.animation.duration.base}`,
    textTransform: 'uppercase',
    letterSpacing: theme.typography.letterSpacing.wide,
  },

  bundleBar: {
    backgroundColor: `${theme.colors.primary}15`,
    border: `2px solid ${theme.colors.primary}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[5],
  },

  bundleInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[3],
  },

  bundleIcon: {
    fontSize: theme.typography.fontSize['2xl'],
  },

  bundleText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.black,
  },
};

// Add hover effect
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    button:hover {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(styleSheet);
}
