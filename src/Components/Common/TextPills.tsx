import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Opacity, ThemeColor, ThemeText} from '@Utilities/Styles/GlobalStyles';

const TextPills = (props: {text: string; color?: string}) => {
  const color = props.color || ThemeColor.accent;
  return (
    <Text
      numberOfLines={1}
      style={[
        ThemeText.Content_Bold,
        styles.TextStyle,
        {
          color: color,
          backgroundColor: color + Opacity[10],
        },
      ]}>
      {props.text}
    </Text>
  );
};
export default TextPills;

const styles = StyleSheet.create({
  TextStyle: {
    flex: 2,
    textAlign: 'center',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
