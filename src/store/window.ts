type Dimensions = {
  [key: string]: {
    width: number;
    height: number;
  };
};

export const SIZES: Dimensions = {
  sm: {
    width: 650,
    height: 720,
  },

  md: {
    width: 650,
    height: 800,
  },

  lg: {
    width: 700,
    height: 800,
  },

  xl: {
    width: 750,
    height: 850,
  },
};

export const windowSizeSelections = [
  {
    label: 'Small',
    sublabel: `width: ${SIZES.sm.width}, height: ${SIZES.sm.height}`,
    value: 'sm',
  },
  {
    label: 'Medium',
    sublabel: `width: ${SIZES.md.width}, height: ${SIZES.md.height}`,
    value: 'md',
  },
  {
    label: 'Large',
    sublabel: `width: ${SIZES.lg.width}, height: ${SIZES.lg.height}`,
    value: 'lg',
  },
  {
    label: 'Extra Large',
    sublabel: `width: ${SIZES.xl.width}, height: ${SIZES.xl.height}`,
    value: 'xl',
  },
];

export default interface WindowStore {
  size: keyof typeof SIZES;

  setSize(key: keyof typeof SIZES): void;
}
