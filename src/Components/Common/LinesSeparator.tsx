import React from 'react';
import {View} from 'react-native';
import {DefaultStyle, Dimens} from '@Utilities/Styles/GlobalStyles';

const LinesSeparator = (props: {dashed?: boolean}) => (
  <View
    style={[
      props.dashed ? DefaultStyle.DashLine : DefaultStyle.InvisLine,
      {marginVertical: Dimens.padding * 0.75},
    ]}
  />
);

export default LinesSeparator;
