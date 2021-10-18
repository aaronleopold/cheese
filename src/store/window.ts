type Dimensions = {
  [key: string]: {
    width: number;
    height: number;
  };
};

export const SIZES: Dimensions = {
  sm: {
    width: 500,
    height: 600,
  },

  md: {
    width: 575,
    height: 650,
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

export const CAMERA_PREVIEW_SIZES = {
  sm: 425,
  md: 500,
  lg: 650,
  xl: 700,
};

function formatDimension(size: { height: number; width: number }) {
  return `Width: ${size.width}px, Height: ${size.height}px`;
}

export const windowSizeSelections = [
  {
    label: 'Small',
    sublabel: formatDimension(SIZES.sm),
    value: 'sm',
  },
  {
    label: 'Medium',
    sublabel: formatDimension(SIZES.md),
    value: 'md',
  },
  {
    label: 'Large',
    sublabel: formatDimension(SIZES.lg),
    value: 'lg',
  },
  {
    label: 'Extra Large',
    sublabel: formatDimension(SIZES.xl),
    value: 'xl',
  },
];

export default interface WindowStore {
  size: 'sm' | 'md' | 'lg' | 'xl';

  setSize(key: 'sm' | 'md' | 'lg' | 'xl'): void;
}
