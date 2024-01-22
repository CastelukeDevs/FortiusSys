import React from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon, {IIconProps} from './Icon';
import {ThemeColor, Dimens, ThemeText} from '@Utilities/Styles/GlobalStyles';

type IButtonPropTypes = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  mode?: 'contained' | 'text' | 'outlined';
  icon?: IIconProps;
  disabled?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
};

//TODO: add disable button function

/**
 *
 * @param label string
 * @param onPress function
 * Simple button
 */
const Button = (props: IButtonPropTypes) => {
  const currentMode = props.mode || 'contained';

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      onLayout={props.onLayout}
      style={[
        styles.RootComponentContainer,
        currentMode === 'contained' && styles.ModeContained,
        currentMode === 'outlined' && styles.ModeOutlined,
        props.style,
        props.disabled && styles.Disabled,
      ]}>
      {props.icon && (
        <Icon
          {...props.icon}
          color={
            currentMode === 'contained' ? ThemeColor.light : ThemeColor.accent
          }
        />
      )}
      {props.label && (
        <Text
          style={[
            ThemeText.Title_SemiBold,
            styles.LabelText,
            {
              color:
                currentMode === 'contained'
                  ? ThemeColor.light
                  : ThemeColor.accent,
            },
            props.labelStyle,
          ]}>
          {props.label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  RootComponentContainer: {
    paddingHorizontal: 6,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModeContained: {
    backgroundColor: ThemeColor.accent,
    borderRadius: Dimens.radius * 3,
  },
  ModeOutlined: {
    borderWidth: 1,
    borderColor: ThemeColor.accent,
    borderRadius: Dimens.radius,
  },
  LabelText: {
    textAlign: 'center',
    marginHorizontal: 8,
    letterSpacing: 2,
  },
  Disabled: {
    backgroundColor: ThemeColor.dark,
    opacity: 0.5,
  },
});
