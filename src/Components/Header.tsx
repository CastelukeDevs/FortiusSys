import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {Dimens, ThemeColor, ThemeText} from '@Utilities/Styles/GlobalStyles';
import Icon from '@Common/Icon';

type IHeaderProp = {
  onBack?: () => void;
  children?: ReactNode;
  label?: string;
};
const Header = (props: IHeaderProp) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();

  const goBackHandler = () => {
    if (typeof props.onBack !== 'undefined') {
      props.onBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.RootHeaderContainer, {paddingTop: inset.top}]}>
      <View style={styles.HeaderContainer}>
        {navigation.canGoBack() ? (
          <Icon
            name="arrow-back"
            size={24}
            style={{flex: 1}}
            onPress={goBackHandler}
            disabled={false}
          />
        ) : (
          <View style={{flex: 1}} />
        )}
        <Text style={[ThemeText.H3_Bold, {textAlign: 'center'}]}>
          {props.label}
        </Text>
        <View style={{flex: 1}} />
      </View>
      {props.children}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  RootHeaderContainer: {
    backgroundColor: ThemeColor.light,
    elevation: 6,
  },
  HeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Dimens.padding,
  },
});
