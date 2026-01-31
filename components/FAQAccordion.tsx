import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../theme';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Frequently Asked Questions</h3>
      <div style={styles.list}>
        {items.map((item, index) => (
          <div key={index} style={styles.item}>
            <button
              onClick={() => toggleFAQ(index)}
              style={{
                ...styles.questionButton,
                ...(activeIndex === index && styles.questionButtonActive),
              }}
            >
              <span style={styles.questionText}>{item.question}</span>
              <span style={styles.icon}>
                {activeIndex === index ? '−' : '+'}
              </span>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={styles.answer}
                >
                  <p style={styles.answerText}>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    margin: `${theme.spacing[12]} 0`,
  },

  heading: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
    marginBottom: theme.spacing[6],
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[3],
  },

  item: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    border: `2px solid ${theme.colors.gray[200]}`,
    overflow: 'hidden',
    transition: `all ${theme.animation.duration.base}`,
  },

  questionButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing[5],
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    transition: `all ${theme.animation.duration.base}`,
  },

  questionButtonActive: {
    backgroundColor: theme.colors.offWhite,
  },

  questionText: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.black,
  },

  icon: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginLeft: theme.spacing[4],
  },

  answer: {
    overflow: 'hidden',
  },

  answerText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray[600],
    lineHeight: theme.typography.lineHeight.relaxed,
    padding: `0 ${theme.spacing[5]} ${theme.spacing[5]}`,
  },
};
