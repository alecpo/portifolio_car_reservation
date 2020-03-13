const SIZE = {
  verySmall: '10px',
  small: '12px',
  regular: '14px',
  big: '16px',
  veryBig: '18px',
  huge: '20px',
  veryHuge: '26px'
};

const WEIGHT = {
  bold: 'bold',
  regular: '500'
};

const typography = {
  verySmallLabel: {
    weight: WEIGHT.regular,
    size: SIZE.verySmall
  },
  verySmallLabelBold: {
    weight: WEIGHT.bold,
    size: SIZE.verySmall
  },
  smallLabel: {
    weight: WEIGHT.regular,
    size: SIZE.small
  },
  smallLabelBold: {
    weight: WEIGHT.bold,
    size: SIZE.small
  },
  defaultLabel: {
    weight: WEIGHT.regular,
    size: SIZE.big
  },
  defaultLabelBold: {
    weight: WEIGHT.bold,
    size: SIZE.big
  },
  mediumLabelBold: {
    weight: WEIGHT.bold,
    size: SIZE.veryBig
  }
};

export default typography;
