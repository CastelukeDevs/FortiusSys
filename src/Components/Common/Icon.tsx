import React, {forwardRef} from 'react';
import {TextStyle} from 'react-native';
import {ThemeColor} from '@Utilities/Styles/GlobalStyles';
import IonIcon from 'react-native-vector-icons/Ionicons';

enum IconMode {
  outline,
  filled,
  sharp,
}

enum IconList {
  'arrow-back',
  'at',
  'calendar',
  'card',
  'cash',
  'checkmark',
  'chevron-back',
  'close',
  'desktop',
  'eye',
  'eye-off',
  'home',
  'lock-closed',
  'lock-open',
  'logo-usd',
  'mail',
  'notifications',
  'pencil',
  'person',
  'rocket',
}

export type IIconMode = keyof typeof IconMode;
export type IIconName = keyof typeof IconList;
type IIcon = IIconName;

export type IIconProps = {
  name?: IIcon;
  size?: number;
  color?: string;
  mode?: IIconMode;
  disabled?: boolean;
  onPress?: () => void;
  style?: TextStyle;
};

const getIconName = (name: IIcon, mode?: IIconMode): IIcon => {
  const selectedMode = mode || 'outline';
  if (name.includes('logo')) return name;
  if (name.includes('outline')) return name;
  return (name +
    (selectedMode === 'filled' ? '' : `-${selectedMode}`)) as IIcon;
};

/**
 * Icon components extends RN Vector icons using IonIcons
 *
 * @param name icon name
 * @param size icon size
 * @param color icon color
 * @param mode icon mode
 *
 * @default "home"
 * @default 20
 * @default ThemeDark
 * @default "outline"
 * @returns
 */
const Icon = forwardRef<IonIcon, IIconProps>((props, ref) => {
  const {
    name = 'home',
    size = 20,
    mode = 'outline',
    color = ThemeColor.dark,
  } = props; //default value

  const iconName = getIconName(name, mode);

  return (
    <IonIcon
      ref={ref}
      name={iconName}
      size={size}
      color={color}
      disabled={typeof props.onPress === 'undefined' || props.disabled}
      onPress={props.onPress}
      style={props.style}
    />
  );
});

export default Icon;
