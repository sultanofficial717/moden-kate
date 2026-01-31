import React from 'react';
import { theme } from '../theme';

export const AnnouncementBar: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <span style={styles.text}>
          <strong>Complimentary Shipping</strong> on orders above $50 | Use code <strong>KATE10</strong> for 10% off your first order
        </span>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: 'linear-gradient(90deg, #1a1a1a 0%, #000 50%, #1a1a1a 100%)',
    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
  },

  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[3],
  },

  text: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: theme.typography.letterSpacing.wide,
  },
};
