import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {G, Path, Svg} from 'react-native-svg';
import {ThemeColor} from '@Utilities/Styles/GlobalStyles';

type ILogoProps = {
  color?: string;
};
const Logo = (props: ILogoProps) => {
  const color = props.color || ThemeColor.dark;
  return (
    <Svg width="100%" height="100%" viewBox="0 0 100 100">
      <G transform="rotate(-1.37907 50.9029 50.0465)" id="svg_10">
        <Path
          d="m10.71193,28.30738l60.82756,-26.5612l19.70158,15.68905l-80.67642,35.43013l0.14728,-24.55798z"
          fill={color}
        />
        <Path
          d="m10.71198,59.52841l60.82756,-26.5612l19.70159,15.68906l-80.67642,35.43013l0.14728,-24.55798z"
          fill={color}
        />
        <Path
          d="m10.71196,89.51029l22.68052,-9.4803l0.16286,18.31689l-22.84338,-8.83658z"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default Logo;

const styles = StyleSheet.create({});
