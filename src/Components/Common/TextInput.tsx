import React, {forwardRef, useEffect} from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  TextInputProps,
  TextInput as RNInput,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Icon, {IIconProps} from './Icon';
import {Dimens, ThemeColor, ThemeText} from '@Utilities/Styles/GlobalStyles';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

type ITextInputBordered = {
  mode?: 'Outlined' | 'Circled';
};
type ITextInputUnderlined = {
  mode?: 'Underlined';
  lineColor?: string;
};

type IMergedTextInput = ITextInputBordered | ITextInputUnderlined;

export type ITextInputProps = {
  label: string;
  value: string;
  onChangeText: (str: string) => void;
  iconLeading?: IIconProps;
  iconTrailing?: IIconProps;
  options?: TextInputProps;
  errorMessage?: string;
  showLabel?: boolean;
  isMoney?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  currencyStyle?: TextStyle;
} & IMergedTextInput &
  TextInputProps;

/**
 * Custom Input text with animation
 * @requires label string
 * @requires value string
 * @requires onChangeText (text:string)=>void
 *
 * @default mode "Outlined"
 */
const TextInput = forwardRef<RNInput, ITextInputProps>((props, ref) => {
  const currentMode = props.mode || 'Outlined';
  const duration = 500;

  const [value, decimalValue] = props.isMoney
    ? props.value.toString().split('.')
    : [props.value];

  /**
   * Note - State:
   * - 0 = blur
   * - 1 = focused
   * - 2 = error
   */
  const inputState = useSharedValue(0);

  const interpolationInput = [0, 1, 2];
  const interpolationOutput = [
    ThemeColor.inactive,
    ThemeColor.active,
    ThemeColor.error,
  ];

  const inputAnimationStyle = useAnimatedStyle(() => {
    const colorInterpolation = interpolateColor(
      inputState.value,
      interpolationInput,
      interpolationOutput,
    );
    return {
      borderColor: colorInterpolation,
    };
  });

  const iconAnimationStyle = useAnimatedStyle(() => {
    const colorInterpolation = interpolateColor(
      inputState.value,
      interpolationInput,
      interpolationOutput,
    );
    return {
      color: colorInterpolation,
    };
  });

  const animateTo = (state: number) => {
    inputState.value = withTiming(state, {duration});
  };

  useEffect(() => {
    if (props.errorMessage) return animateTo(2);
    animateTo(0);
  }, [props.errorMessage]);

  const onChangeTextHandler = (v: string) => {
    props.isMoney
      ? props.onChangeText(
          parseFloat(v || '0.0').toString() + '.' + (decimalValue || ''),
        )
      : props.onChangeText(v);
  };

  const onDecimalChangeText = (v: string) => {
    props.onChangeText(value + '.' + v);
  };

  const onFocusHandler = (
    ev: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    animateTo(1);
    props.onFocus?.(ev);
  };

  const onBlurHandler = (ev: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (props.errorMessage) return animateTo(2);
    animateTo(0);
    props.onBlur?.(ev);
  };

  const showLabel = (label: string) =>
    props.showLabel && (
      <Text
        style={[ThemeText.SubTitle_Bold, styles.LabelText, props.labelStyle]}>
        {label}
      </Text>
    );

  const showIcon = (icon: IIconProps | undefined) =>
    icon && <AnimatedIcon {...icon} style={iconAnimationStyle} />;

  const showLeadingMoney = () =>
    props.isMoney && (
      <Text
        style={[
          ThemeText.SubTitle_Regular,
          {marginLeft: 10},
          props.currencyStyle,
        ]}>
        Rp
      </Text>
    );

  const showTrailingMoney = () =>
    props.isMoney && (
      <>
        <Text style={props.style}>.</Text>
        <RNInput
          value={decimalValue || ''}
          onChangeText={onDecimalChangeText}
          style={[
            inputPlatformStyle,
            {flex: 0},
            ThemeText.SubTitle_Regular,
            props.style,
          ]}
          placeholder="00"
          maxLength={2}
          // ref={ref}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onSubmitEditing={props.onSubmitEditing}
          keyboardType="number-pad"
        />
      </>
    );

  return (
    <>
      {showLabel(props.label)}
      <Animated.View
        style={[
          styles.CoreContainer,
          getModeStyle(currentMode),
          inputAnimationStyle,
          props.containerStyle,
          {marginBottom: 0},
        ]}>
        {showIcon(props.iconLeading)}
        {showLeadingMoney()}
        <RNInput
          {...props}
          ref={ref}
          value={value}
          onChangeText={onChangeTextHandler}
          style={[inputPlatformStyle, ThemeText.SubTitle_Regular, props.style]}
          placeholder={props.placeholder || props.label}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          textContentType={props.secureTextEntry ? 'oneTimeCode' : undefined}
          keyboardType={props.isMoney ? 'number-pad' : props.keyboardType}
          returnKeyType={
            props.isMoney ? 'done' : props.returnKeyType || 'default'
          }
        />
        {showTrailingMoney()}
        {showIcon(props.iconTrailing)}
      </Animated.View>
      <Text style={[styles.ErrorText, props.containerStyle]}>
        {props.errorMessage || ' '}
      </Text>
    </>
  );
});

export default TextInput;

const baseInputStyle: TextStyle = {
  flex: 1,
  marginHorizontal: 6,
  // backgroundColor: 'red',
};

const baseBorderedContainerStyle: ViewStyle = {
  paddingHorizontal: 8,
  borderWidth: 1,
};

const styles = StyleSheet.create({
  CoreContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: ThemeColor.dark,
  },
  InputIOS: {
    ...baseInputStyle,
    paddingVertical: 4,
  },
  InputAndroid: {
    ...baseInputStyle,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  ContainerCircledMode: {
    ...baseBorderedContainerStyle,
    borderRadius: 1000,
  },
  ContainerOutlinedMode: {
    ...baseBorderedContainerStyle,
    borderRadius: Dimens.radius,
  },
  ContainerUnderlinedMode: {
    paddingBottom: 4,
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  LabelText: {
    textAlign: 'left',
    width: '100%',
    marginBottom: 4,
  },
  ErrorText: {
    textAlign: 'right',
    color: ThemeColor.error,
    marginVertical: 4,
  },
});

//Style utilities
const getModeStyle = (mode: ITextInputProps['mode']): ViewStyle => {
  switch (mode) {
    case 'Underlined':
      return styles.ContainerUnderlinedMode;
    case 'Outlined':
      return styles.ContainerOutlinedMode;
    default:
      return styles.ContainerCircledMode;
  }
};

const inputPlatformStyle =
  Platform.OS === 'ios' ? styles.InputIOS : styles.InputAndroid;
