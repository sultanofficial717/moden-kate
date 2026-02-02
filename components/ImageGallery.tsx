import React from 'react';
import { motion } from 'framer-motion';
import { theme, placeholderMedia } from '../theme';
import { Product } from '../types';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = React.useState(0);

  // Use placeholder if no images provided
  const displayImages = images.length > 0 
    ? images 
    : [
        placeholderMedia.images.watchBlack,
        placeholderMedia.images.watchWhite,
        placeholderMedia.images.watchSport,
      ];

  return (
    <div style={styles.container}>
      {/* Main Image */}
      <motion.div
        style={styles.mainImageContainer}
        key={selectedImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={displayImages[selectedImage]}
          alt={`${productName} - View ${selectedImage + 1}`}
          style={styles.mainImage}
        />
      </motion.div>

      {/* Thumbnail Grid */}
      <div style={styles.thumbnailGrid}>
        {displayImages.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedImage(index)}
            style={{
              ...styles.thumbnail,
              ...(selectedImage === index && styles.thumbnailActive),
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              style={styles.thumbnailImage}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[4],
  },

  mainImageContainer: {
    width: '100%',
    aspectRatio: '1',
    backgroundColor: theme.colors.offWhite,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
  },

  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  thumbnailGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gap: theme.spacing[3],
  },

  thumbnail: {
    width: '100%',
    aspectRatio: '1',
    backgroundColor: theme.colors.offWhite,
    border: `2px solid ${theme.colors.gray[200]}`,
    borderRadius: theme.borderRadius.base,
    overflow: 'hidden',
    cursor: 'pointer',
    padding: 0,
    transition: `all ${theme.animation.duration.base}`,
  },

  thumbnailActive: {
    borderColor: theme.colors.primary,
    boxShadow: `0 0 0 2px ${theme.colors.primary}`,
  },

  thumbnailImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};
