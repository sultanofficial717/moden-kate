import React from 'react';
import { motion } from 'framer-motion';
import { placeholderMedia } from '../theme';

interface UGCGalleryProps {
  limit?: number;
}

export const UGCGallery: React.FC<UGCGalleryProps> = ({ limit = 6 }) => {
  // Placeholder UGC posts - will be replaced with real Instagram/TikTok API data
  const ugcPosts = placeholderMedia.ugc.slice(0, limit);

  return (
    <section style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>#ModenKateIRL</h2>
        <p style={styles.subheading}>
          See how the crew styles their Moden Kate. Tag us for a chance to be featured!
        </p>
      </div>

      <div style={styles.grid}>
        {ugcPosts.map((image, index) => (
          <motion.div
            key={index}
            style={styles.card}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <img src={image} alt={`UGC post ${index + 1}`} style={styles.image} />
            <div style={styles.overlay}>
              <button style={styles.shopButton}>Shop This Look</button>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={styles.cta}>
        <button style={styles.loadMoreButton}>
          Load More from the Crew
        </button>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '80px 20px',
    backgroundColor: '#0A0A0A',
  },

  header: {
    textAlign: 'center',
    marginBottom: '48px',
  },

  heading: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '3rem',
    fontWeight: 900,
    color: '#FFFFFF',
    marginBottom: '16px',
    letterSpacing: '-0.02em',
  },

  subheading: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '1.125rem',
    color: '#A3A3A3',
    maxWidth: '600px',
    margin: '0 auto',
  },

  grid: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  },

  card: {
    position: 'relative',
    aspectRatio: '1',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
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
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '0.875rem',
    fontWeight: 700,
    color: '#0A0A0A',
    backgroundColor: '#FF0080',
    border: 'none',
    borderRadius: '999px',
    padding: '10px 20px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },

  cta: {
    textAlign: 'center',
    marginTop: '48px',
  },

  loadMoreButton: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '1rem',
    fontWeight: 700,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    border: '2px solid #FF0080',
    borderRadius: '999px',
    padding: '16px 40px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
};

// Add hover effects
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    [style*="card"]:hover [style*="overlay"] {
      opacity: 1;
    }
    
    [style*="loadMoreButton"]:hover {
      background-color: #FF0080;
      transform: translateY(-2px);
      box-shadow: 0 0 20px rgba(255, 0, 128, 0.5);
    }
  `;
  document.head.appendChild(styleSheet);
}
