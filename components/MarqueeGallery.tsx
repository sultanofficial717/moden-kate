import React from 'react';
import { motion } from 'framer-motion';
import { theme, placeholderMedia } from '../theme';

interface MarqueeGalleryProps {
  speed?: number;
}

export const MarqueeGallery: React.FC<MarqueeGalleryProps> = ({ speed = 20 }) => {
  const ugcImages = [...placeholderMedia.ugc, ...placeholderMedia.ugc]; // Duplicate for seamless loop

  return (
    <section style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>#MODENKATEIRL</h2>
        <p style={styles.subheading}>
          Tag us to be featured + win monthly gear drops.
        </p>
      </div>

      <div style={styles.marqueeWrapper}>
        <motion.div
          style={styles.marqueeContent}
          animate={{ x: [0, -50 + '%'] }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {ugcImages.map((image, index) => (
            <div key={index} style={styles.card}>
              <img src={image} alt={`UGC ${index + 1}`} style={styles.image} />
              <div style={styles.overlay}>
                <button style={styles.shopButton}>Shop This Look</button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '80px 24px',
    backgroundColor: theme.colors.primary, // Cyber lime background
    overflow: 'hidden',
  },

  header: {
    textAlign: 'center',
    marginBottom: '48px',
  },

  heading: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize['5xl'],
    fontWeight: theme.typography.fontWeight.black,
    color: theme.colors.black,
    marginBottom: '16px',
    letterSpacing: theme.typography.letterSpacing.tight,
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },

  subheading: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.black,
    fontWeight: theme.typography.fontWeight.bold,
  },

  marqueeWrapper: {
    width: '100%',
    overflow: 'hidden',
  },

  marqueeContent: {
    display: 'flex',
    gap: '16px',
    width: 'max-content',
  },

  card: {
    position: 'relative',
    width: '256px',
    height: '256px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    border: `3px solid ${theme.colors.black}`,
    borderRadius: '0',
    overflow: 'hidden',
    cursor: 'pointer',
    flexShrink: 0,
    boxShadow: theme.shadows.brutal,
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 0.9) 100%)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: '20px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },

  shopButton: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.black,
    color: theme.colors.black,
    backgroundColor: theme.colors.white,
    border: `3px solid ${theme.colors.black}`,
    borderRadius: '0',
    padding: '10px 20px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: theme.typography.letterSpacing.wide,
    boxShadow: theme.shadows.brutalSm,
  },
};

// Add hover effects
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    [style*="card"]:hover [style*="overlay"] {
      opacity: 1;
    }
  `;
  document.head.appendChild(styleSheet);
}
