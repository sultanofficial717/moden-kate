// Moden Kate Design System - Gen Z Bold Theme

export const theme = {
  colors: {
    // Primary Brand Colors - Neo-Brutalism Style
    primary: '#CCFF00', // Cyber Lime - Main brand color (matching logo)
    secondary: '#8B5CF6', // Electric Violet - Accent color
    tertiary: '#FF006E', // Hot Pink - Highlights
    
    // Neutrals
    black: '#0A0A0A',
    white: '#FFFFFF',
    offWhite: '#F5F5F5',
    gray: {
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    
    // Duotone Effects
    duotone: {
      pink: '#FF0080',
      blue: '#0080FF',
      yellow: '#FFD600',
      purple: '#8B00FF',
    },
    
    // Status Colors
    success: '#00FF88',
    warning: '#FFD600',
    error: '#FF0055',
    info: '#00F0FF',
  },

  typography: {
    // Font Families - Neo-Brutalism Bold Fonts
    fontFamily: {
      heading: "'Syne', 'Space Grotesk', system-ui, -apple-system, sans-serif",
      body: "'Inter', system-ui, -apple-system, sans-serif",
      mono: "'Courier New', 'JetBrains Mono', monospace",
    },
    
    // Font Sizes
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
    },
    
    // Font Weights
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    
    // Line Heights
    lineHeight: {
      tight: 1.1,
      snug: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
    
    // Letter Spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },

  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    base: '0.5rem',  // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    // Neo-Brutalism Shadows
    brutal: '6px 6px 0px #000',
    brutalHover: '10px 10px 0px #000',
    brutalSm: '4px 4px 0px #000',
    neon: '0 0 20px rgba(204, 255, 0, 0.5)',
    neonStrong: '0 0 30px rgba(204, 255, 0, 0.8), 0 0 60px rgba(204, 255, 0, 0.4)',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  zIndex: {
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    modal: 1000,
    popover: 1100,
    tooltip: 1200,
    notification: 1300,
  },

  animation: {
    // Gen Z: Fast, snappy animations
    duration: {
      fast: '150ms',
      base: '250ms',
      slow: '400ms',
    },
    easing: {
      ease: 'ease',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

export const copy = {
  taglines: {
    hero: "Live Luxury. Don't Overpay.",
    subHero: "Premium tech accessories that match your vibe, not your parents' budget.",
  },
  
  cta: {
    primary: "Shop the Vibe",
    secondary: "Join the Crew",
    shop: "Get Yours",
    explore: "Explore Drops",
  },
  
  trust: {
    warranty: "1-Year No Cap Warranty",
    returns: "30-Day Vibe Check",
    shipping: "Free Delivery Always",
    sustainability: "Carbon Neutral Flex",
  },
  
  vibes: {
    study: {
      title: "Study Sesh",
      description: "Focus mode activated. Watch + earbuds + charger for all-nighters that hit different.",
      emoji: "📚✨",
    },
    weekend: {
      title: "Weekend Flex",
      description: "It's giving main character energy. Bold watch + speaker for when you're the moment.",
      emoji: "🎉💫",
    },
    gym: {
      title: "Gym Flow",
      description: "Sweat-proof and slay-ready. Sporty watch + earbuds that don't quit mid-set.",
      emoji: "💪🔥",
    },
    chill: {
      title: "Chill Beats",
      description: "Big vibes only. Watch + over-ear headphones for when you need that escape pod energy.",
      emoji: "🎧💜",
    },
  },
  
  sustainability: {
    title: "Our Sustainability Vibe",
    subtitle: "Looking good while doing good? That's the energy.",
    sections: [
      {
        title: "Carbon Neutral Shipping",
        description: "Every order = carbon offset. We're not just talking about it, we're being about it.",
      },
      {
        title: "Recycled Materials",
        description: "Our packaging is 90% recycled. Because the planet shouldn't pay for your drip.",
      },
      {
        title: "Tech Take-Back Program",
        description: "Old device? Send it back. We'll recycle it properly and hook you up with 15% off your next order.",
      },
    ],
  },
  
  faq: {
    battery: {
      question: "How long does the battery last on a real day out?",
      answer: "Our watches last 5-7 days on a single charge. Earbuds? 6 hours playback, 24 with the case. No dead device anxiety here.",
    },
    warranty: {
      question: "What if something goes wrong?",
      answer: "1-year warranty, no questions asked. If it's broken, we'll replace it or refund you. Simple as that.",
    },
    shipping: {
      question: "How fast can I get this?",
      answer: "Free shipping takes 3-5 business days. Need it ASAP? Express is available at checkout (usually 1-2 days).",
    },
    returns: {
      question: "Can I return it if the vibe is off?",
      answer: "30-day returns, full refund. If it's not hitting right, send it back. We get it—vibes matter.",
    },
  },
};

// Placeholder Media URLs (Stock/Free to use)
export const placeholderMedia = {
  videos: {
    hero: 'https://cdn.coverr.co/videos/coverr-person-wearing-white-smartwatch-8052/1080p.mp4',
    product: 'https://cdn.coverr.co/videos/coverr-smartwatch-closeup-8053/1080p.mp4',
  },
  
  images: {
    // Watches
    watchBlack: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    watchWhite: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
    watchSport: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
    
    // Earbuds
    earbudsBlack: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    earbudsWhite: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80',
    
    // Speakers
    speakerBlack: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
    speakerColor: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&q=80',
    
    // Chargers
    charger: 'https://images.unsplash.com/photo-1591290619762-18a0977f2b0a?w=800&q=80',
    
    // Lifestyle
    lifestyle1: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1200&q=80',
    lifestyle2: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    lifestyle3: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&q=80',
    lifestyle4: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&q=80',
    
    // Sustainability
    sustainability1: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
    sustainability2: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=80',
  },
  
  // UGC Gallery Placeholders
  ugc: [
    'https://images.unsplash.com/photo-1511370235399-1802cae1d32f?w=400&q=80',
    'https://images.unsplash.com/photo-1533139142011-8563a6a0e6b5?w=400&q=80',
    'https://images.unsplash.com/photo-1526045478516-99145907023c?w=400&q=80',
    'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=400&q=80',
    'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&q=80',
    'https://images.unsplash.com/photo-1546868871-0164f8f33ba7?w=400&q=80',
  ],
};
