/* Tailwind theme configuration extracted from the original portfolio. */
tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            display: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
            sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          colors: {
            darkVoid: '#090B0E',
            darkSurface: '#101419',
            darkElevated: '#151A21',
            darkGlass: 'rgba(16, 20, 25, 0.72)',
            darkGlassHover: 'rgba(22, 27, 34, 0.88)',
            textPrimary: '#F3F4F6',
            textSecondary: '#9CA3AF',
            textMuted: '#7B8798',
            accentGold: '#D4A359',
            accentGoldHover: '#E2B46E',
            accentSage: '#7A9A8B',
            borderSubtle: 'rgba(255, 255, 255, 0.07)',
            borderGold: 'rgba(212, 163, 89, 0.38)',
            ember: '#B5552B', emberDeep: '#8A3B1F', blood: '#7A1E1E', steelTeal: '#5E8F94', truss: '#12171D',
          }
        }
      }
    };
