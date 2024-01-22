import {Dimensions, StyleSheet} from 'react-native';

export const Dimens = {
  padding: 18,
  radius: 4,
};

export const Opacity = {
  100: 'FF',
  99: 'FC',
  98: 'FA',
  97: 'F7',
  96: 'F5',
  95: 'F2',
  94: 'F0',
  93: 'ED',
  92: 'EB',
  91: 'E8',
  90: 'E6',
  89: 'E3',
  88: 'E0',
  87: 'DE',
  86: 'DB',
  85: 'D9',
  84: 'D6',
  83: 'D4',
  82: 'D1',
  81: 'CF',
  80: 'CC',
  79: 'C9',
  78: 'C7',
  77: 'C4',
  76: 'C2',
  75: 'BF',
  74: 'BD',
  73: 'BA',
  72: 'B8',
  71: 'B5',
  70: 'B3',
  69: 'B0',
  68: 'AD',
  67: 'AB',
  66: 'A8',
  65: 'A6',
  64: 'A3',
  63: 'A1',
  62: '9E',
  61: '9C',
  60: '99',
  59: '96',
  58: '94',
  57: '91',
  56: '8F',
  55: '8C',
  54: '8A',
  53: '87',
  52: '85',
  51: '82',
  50: '80',
  49: '7D',
  48: '7A',
  47: '78',
  46: '75',
  45: '73',
  44: '70',
  43: '6E',
  42: '6B',
  41: '69',
  40: '66',
  39: '63',
  38: '61',
  37: '5E',
  36: '5C',
  35: '59',
  34: '57',
  33: '54',
  32: '52',
  31: '4F',
  30: '4D',
  29: '4A',
  28: '47',
  27: '45',
  26: '42',
  25: '40',
  24: '3D',
  23: '3B',
  22: '38',
  21: '36',
  20: '33',
  19: '30',
  18: '2E',
  17: '2B',
  16: '29',
  15: '26',
  14: '24',
  13: '21',
  12: '1F',
  11: '1C',
  10: '1A',
  9: '17',
  8: '14',
  7: '12',
  6: '0F',
  5: '0D',
  4: '0A',
  3: '08',
  2: '05',
  1: '03',
  0: '00',
};

export const ThemeColor = {
  light: '#ffffff',
  dark: '#111828',
  primary: '#000000',
  active: '#4361EE',
  inactive: '#000000' + Opacity[50],
  accent: '#6841C6',
  error: '#ff6347',
  success: '#3cb371',
} as const;
/**
 * #4361EE
 * #70D6FF
 * #4CC9F0
 * #66cdaa
 */

export const DefaultStyle = StyleSheet.create({
  ModalRootStyle: {
    backgroundColor: ThemeColor.dark + Opacity[30],
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalViewStyle: {
    backgroundColor: ThemeColor.light,
    borderRadius: Dimens.padding,
    padding: Dimens.padding,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  ModalIconStyle: {width: 60, height: 60},
});

export const ThemeDimension = {
  fontSize: {
    hero: 40,
    h1: 32,
    h2: 24,
    h3: 20,
    title: 16,
    subTitle: 14,
    content: 12,
  },
};

export const ThemeText = StyleSheet.create({
  LogoText: {
    color: ThemeColor.light,
    fontWeight: 'bold',
    fontSize: ThemeDimension.fontSize.h1,
  },
  HeroText: {color: ThemeColor.light, fontWeight: '200', fontSize: 54},
  ButtonText: {
    color: ThemeColor.light,
    fontWeight: 'bold',
    fontSize: ThemeDimension.fontSize.subTitle,
  },
  //Text style
  Hero_Regular: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.hero,
  },
  Hero_Bold: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.hero,
    fontWeight: 'bold',
  },
  Hero_Light: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.hero,
    fontWeight: '200',
  },
  H1_Regular: {color: ThemeColor.dark, fontSize: ThemeDimension.fontSize.h1},
  H1_Bold: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.h1,
    fontWeight: 'bold',
  },
  H1_Light: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.h1,
    fontWeight: '200',
  },
  H2_Regular: {color: ThemeColor.dark, fontSize: ThemeDimension.fontSize.h1},
  H2_Bold: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.h1,
    fontWeight: 'bold',
  },
  H2_Light: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.h1,
    fontWeight: '200',
  },
  H3_Regular: {color: ThemeColor.dark, fontSize: ThemeDimension.fontSize.h3},
  H3_Bold: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.h3,
    fontWeight: 'bold',
  },
  H3_Light: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.h3,
    fontWeight: '200',
  },
  Title_Regular: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.title,
  },
  Title_Bold: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.title,
    fontWeight: 'bold',
  },
  Title_SemiBold: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.title,
    fontWeight: '500',
  },
  Title_Light: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.title,
    fontWeight: '200',
  },
  SubTitle_Regular: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.subTitle,
  },
  SubTitle_Bold: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.subTitle,
    fontWeight: 'bold',
  },
  SubTitle_Light: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.subTitle,
    fontWeight: '200',
  },
  Content_Regular: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.content,
  },
  Content_Bold: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.content,
    fontWeight: 'bold',
  },
  Content_Light: {
    color: ThemeColor.dark,
    fontSize: ThemeDimension.fontSize.content,
    fontWeight: '200',
  },
  hyperlink: {color: ThemeColor.accent},
});
