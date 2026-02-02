import React from 'react';
import { theme, copy } from '../theme';

interface TrustItem {
  icon: string;
  text: string;
}

export const TrustBar: React.FC = () => {
  const trustItems: TrustItem[] = [
    {
      icon: '🛡️',
      text: '6 Months Warranty',
    },
    {
      icon: '💭',
      text: '7 Days Easy Return',
    },
    {
      icon: '🚚',
      text: 'Fast and Reliable Shipping',
    },
    {
      icon: '♻️',
      text: 'Premium Quality at Your Price',
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {trustItems.map((item, index) => (
          <div key={index} style={styles.item}>
            <span style={styles.icon}>{item.icon}</span>
            <span style={styles.text}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: 'linear-gradient(90deg, #0A0A0A 0%, #1a1a1a 50%, #0A0A0A 100%)',
    borderTop: `4px solid ${theme.colors.primary}`,
    borderBottom: `4px solid ${theme.colors.primary}`,
    padding: `${theme.spacing[5]} 0`,
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex[40],
    boxShadow: '0 4px 20px rgba(204, 255, 0, 0.1)',
  },

  wrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: `0 ${theme.spacing[4]}`,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing[4],
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[2],
  },

  icon: {
    fontSize: theme.typography.fontSize['2xl'],
  },

  text: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.white,
    letterSpacing: theme.typography.letterSpacing.wide,
    textTransform: 'uppercase',
  },
};
