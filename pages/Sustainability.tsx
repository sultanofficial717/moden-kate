import React from 'react';
import { motion } from 'framer-motion';
import { theme, copy, placeholderMedia } from '../theme';

export const Sustainability: React.FC = () => {
  const sections = copy.sustainability.sections;

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <motion.h1
          style={styles.heroTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {copy.sustainability.title}
        </motion.h1>
        <motion.p
          style={styles.heroSubtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {copy.sustainability.subtitle}
        </motion.p>
      </section>

      {/* Main Content */}
      <section style={styles.content}>
        <div style={styles.grid}>
          {sections.map((section, index) => (
            <motion.div
              key={index}
              style={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div style={styles.cardIcon}>
                {index === 0 && '🌍'}
                {index === 1 && '♻️'}
                {index === 2 && '🔄'}
              </div>
              <h3 style={styles.cardTitle}>{section.title}</h3>
              <p style={styles.cardDescription}>{section.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.stats}>
        <motion.div
          style={styles.statsGrid}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={styles.statItem}>
            <div style={styles.statNumber}>90%</div>
            <div style={styles.statLabel}>Recycled Packaging</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>100%</div>
            <div style={styles.statLabel}>Carbon Neutral Shipping</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>15%</div>
            <div style={styles.statLabel}>Discount for Trade-Ins</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>5K+</div>
            <div style={styles.statLabel}>Devices Recycled</div>
          </div>
        </motion.div>
      </section>

      {/* Image Section */}
      <section style={styles.imageSection}>
        <div style={styles.imageGrid}>
          <motion.div
            style={styles.imageCard}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={placeholderMedia.images.sustainability1}
              alt="Sustainability"
              style={styles.image}
            />
          </motion.div>
          <motion.div
            style={styles.imageCard}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <img
              src={placeholderMedia.images.sustainability2}
              alt="Recycling"
              style={styles.image}
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <motion.div
          style={styles.ctaContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={styles.ctaTitle}>Ready to Make a Difference?</h2>
          <p style={styles.ctaText}>
            Every purchase helps offset carbon emissions. Every trade-in keeps e-waste out of landfills.
            Every choice matters.
          </p>
          <button style={styles.ctaButton}>
            Shop Sustainable
          </button>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section style={styles.faq}>
        <h2 style={styles.faqTitle}>Common Questions</h2>
        <div style={styles.faqGrid}>
          <div style={styles.faqItem}>
            <h4 style={styles.faqQuestion}>What materials do you use?</h4>
            <p style={styles.faqAnswer}>
              Our products are made with responsibly sourced materials. Packaging is 90% recycled paper and cardboard.
              No single-use plastics here.
            </p>
          </div>
          <div style={styles.faqItem}>
            <h4 style={styles.faqQuestion}>How does the trade-in program work?</h4>
            <p style={styles.faqAnswer}>
              Send us your old tech accessory (any brand). We'll recycle it properly and send you a 15% discount code
              for your next order. Simple as that.
            </p>
          </div>
          <div style={styles.faqItem}>
            <h4 style={styles.faqQuestion}>Is carbon neutral shipping really free?</h4>
            <p style={styles.faqAnswer}>
              Yes! We offset 100% of the carbon emissions from every shipment. You don't pay extra—we build it into
              our model because it's the right thing to do.
            </p>
          </div>
          <div style={styles.faqItem}>
            <h4 style={styles.faqQuestion}>What happens to traded-in devices?</h4>
            <p style={styles.faqAnswer}>
              We partner with certified e-waste recyclers. Devices are disassembled, materials are sorted, and everything
              is either recycled or safely disposed of. Nothing goes to landfills.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: theme.colors.white,
  },

  hero: {
    textAlign: 'center',
    padding: `${theme.spacing[24]} ${theme.spacing[4]} ${theme.spacing[16]}`,
    background: `linear-gradient(135deg, ${theme.colors.black} 0%, ${theme.colors.gray[900]} 100%)`,
    color: theme.colors.white,
  },

  heroTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize['6xl'],
    fontWeight: theme.typography.fontWeight.black,
    marginBottom: theme.spacing[4],
    letterSpacing: theme.typography.letterSpacing.tight,
  },

  heroSubtitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.gray[300],
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: theme.typography.lineHeight.relaxed,
  },

  content: {
    padding: `${theme.spacing[16]} ${theme.spacing[4]}`,
    maxWidth: '1200px',
    margin: '0 auto',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing[8],
  },

  card: {
    textAlign: 'center',
    padding: theme.spacing[8],
  },

  cardIcon: {
    fontSize: theme.typography.fontSize['6xl'],
    marginBottom: theme.spacing[4],
  },

  cardTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
    marginBottom: theme.spacing[3],
  },

  cardDescription: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray[600],
    lineHeight: theme.typography.lineHeight.relaxed,
  },

  stats: {
    backgroundColor: theme.colors.primary,
    padding: `${theme.spacing[16]} ${theme.spacing[4]}`,
  },

  statsGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing[8],
    textAlign: 'center',
  },

  statItem: {
    color: theme.colors.white,
  },

  statNumber: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize['5xl'],
    fontWeight: theme.typography.fontWeight.black,
    marginBottom: theme.spacing[2],
  },

  statLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
  },

  imageSection: {
    padding: `${theme.spacing[16]} ${theme.spacing[4]}`,
    maxWidth: '1400px',
    margin: '0 auto',
  },

  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: theme.spacing[6],
  },

  imageCard: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    boxShadow: theme.shadows.xl,
  },

  image: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
  },

  cta: {
    backgroundColor: theme.colors.offWhite,
    padding: `${theme.spacing[20]} ${theme.spacing[4]}`,
    textAlign: 'center',
  },

  ctaContent: {
    maxWidth: '700px',
    margin: '0 auto',
  },

  ctaTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
    marginBottom: theme.spacing[4],
  },

  ctaText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.gray[600],
    lineHeight: theme.typography.lineHeight.relaxed,
    marginBottom: theme.spacing[8],
  },

  ctaButton: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    border: 'none',
    borderRadius: theme.borderRadius.full,
    padding: `${theme.spacing[4]} ${theme.spacing[10]}`,
    cursor: 'pointer',
    transition: `all ${theme.animation.duration.base} ${theme.animation.easing.easeOut}`,
    boxShadow: theme.shadows.neon,
    textTransform: 'uppercase',
    letterSpacing: theme.typography.letterSpacing.wide,
  },

  faq: {
    padding: `${theme.spacing[16]} ${theme.spacing[4]}`,
    maxWidth: '1000px',
    margin: '0 auto',
  },

  faqTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
    textAlign: 'center',
    marginBottom: theme.spacing[12],
  },

  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: theme.spacing[8],
  },

  faqItem: {
    padding: theme.spacing[6],
    backgroundColor: theme.colors.offWhite,
    borderRadius: theme.borderRadius.lg,
    borderLeft: `4px solid ${theme.colors.primary}`,
  },

  faqQuestion: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
    marginBottom: theme.spacing[3],
  },

  faqAnswer: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray[600],
    lineHeight: theme.typography.lineHeight.relaxed,
  },
};
