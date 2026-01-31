import React from 'react';
import { motion } from 'framer-motion';
import { theme, copy, placeholderMedia } from '../theme';

interface VibeBundle {
  id: string;
  title: string;
  description: string;
  emoji: string;
  image: string;
  products: string[];
  discount: number;
}

export const VibeShop: React.FC = () => {
  const bundles: VibeBundle[] = [
    {
      id: 'study',
      title: copy.vibes.study.title,
      description: copy.vibes.study.description,
      emoji: copy.vibes.study.emoji,
      image: placeholderMedia.images.lifestyle1,
      products: ['Smart Watch', 'Wireless Earbuds', 'Fast Charger'],
      discount: 15,
    },
    {
      id: 'weekend',
      title: copy.vibes.weekend.title,
      description: copy.vibes.weekend.description,
      emoji: copy.vibes.weekend.emoji,
      image: placeholderMedia.images.lifestyle2,
      products: ['Bold Watch', 'Portable Speaker'],
      discount: 10,
    },
    {
      id: 'gym',
      title: copy.vibes.gym.title,
      description: copy.vibes.gym.description,
      emoji: copy.vibes.gym.emoji,
      image: placeholderMedia.images.lifestyle3,
      products: ['Sport Watch', 'Sweat-Resistant Earbuds'],
      discount: 12,
    },
    {
      id: 'chill',
      title: copy.vibes.chill.title,
      description: copy.vibes.chill.description,
      emoji: copy.vibes.chill.emoji,
      image: placeholderMedia.images.lifestyle4,
      products: ['Premium Watch', 'Over-Ear Headphones'],
      discount: 20,
    },
  ];

  return (
    <section style={styles.container}>
      <div style={styles.header}>
        <motion.h2
          style={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Shop by Vibe
        </motion.h2>
        <motion.p
          style={styles.subheading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Curated bundles that match your energy. Save up to 20% when you complete the look.
        </motion.p>
      </div>

      <div style={styles.grid}>
        {bundles.map((bundle, index) => (
          <motion.div
            key={bundle.id}
            style={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            {/* Image */}
            <div style={styles.imageContainer}>
              <img src={bundle.image} alt={bundle.title} style={styles.image} />
              <div style={styles.imageOverlay}>
                <span style={styles.emoji}>{bundle.emoji}</span>
              </div>
              <div style={styles.discountBadge}>
                Save {bundle.discount}%
              </div>
            </div>

            {/* Content */}
            <div style={styles.content}>
              <h3 style={styles.title}>{bundle.title}</h3>
              <p style={styles.description}>{bundle.description}</p>
              
              <div style={styles.products}>
                {bundle.products.map((product, idx) => (
                  <span key={idx} style={styles.productTag}>
                    {product}
                  </span>
                ))}
              </div>

              <button style={styles.button}>
                Shop This Vibe
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: `${theme.spacing[20]} ${theme.spacing[4]}`,
    backgroundColor: theme.colors.offWhite,
  },

  header: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: `0 auto ${theme.spacing[12]}`,
  },

  heading: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize['5xl'],
    fontWeight: theme.typography.fontWeight.black,
    color: theme.colors.black,
    marginBottom: theme.spacing[4],
    letterSpacing: theme.typography.letterSpacing.tight,
  },

  subheading: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.gray[600],
    lineHeight: theme.typography.lineHeight.relaxed,
  },

  grid: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing[6],
  },

  card: {
    backgroundColor: theme.colors.white,
    border: `3px solid ${theme.colors.black}`,
    borderRadius: '0',
    overflow: 'hidden',
    boxShadow: theme.shadows.brutal,
    cursor: 'pointer',
    transition: `all ${theme.animation.duration.base} ${theme.animation.easing.easeOut}`,
  },

  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '300px',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: `transform ${theme.animation.duration.slow} ${theme.animation.easing.easeOut}`,
  },

  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 0.7) 100%)',
    display: 'flex',
    alignItems: 'flex-end',
    padding: theme.spacing[6],
  },

  emoji: {
    fontSize: theme.typography.fontSize['4xl'],
  },

  discountBadge: {
    position: 'absolute',
    top: theme.spacing[4],
    right: theme.spacing[4],
    backgroundColor: '#EF4444',
    color: theme.colors.white,
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.black,
    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
    border: `3px solid ${theme.colors.black}`,
    borderRadius: '0',
    textTransform: 'uppercase',
    letterSpacing: theme.typography.letterSpacing.wide,
    boxShadow: theme.shadows.brutalSm,
  },

  content: {
    padding: theme.spacing[6],
  },

  title: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
    marginBottom: theme.spacing[3],
  },

  description: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray[600],
    lineHeight: theme.typography.lineHeight.relaxed,
    marginBottom: theme.spacing[4],
  },

  products: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
    marginBottom: theme.spacing[6],
  },

  productTag: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}15`,
    padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
    borderRadius: theme.borderRadius.full,
    border: `1px solid ${theme.colors.primary}`,
  },

  button: {
    width: '100%',
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.black,
    color: theme.colors.white,
    backgroundColor: theme.colors.black,
    border: `3px solid ${theme.colors.black}`,
    borderRadius: '0',
    padding: `${theme.spacing[4]} ${theme.spacing[6]}`,
    cursor: 'pointer',
    transition: `all ${theme.animation.duration.base} ${theme.animation.easing.easeOut}`,
    textTransform: 'uppercase',
    letterSpacing: theme.typography.letterSpacing.wide,
    boxShadow: theme.shadows.brutalSm,
  },
};

// Add hover effects
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    [style*="card"]:hover img {
      transform: scale(1.1);
    }
    
    [style*="button"]:hover {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.black};
      transform: translate(-2px, -2px);
      box-shadow: ${theme.shadows.brutalHover};
    }
  `;
  document.head.appendChild(styleSheet);
}
