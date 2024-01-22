import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput as RNInput,
  StatusBar,
} from 'react-native';
import {useAppDispatch} from '@Redux/Store';

import {IMainNavProp} from '@Routes/RouteTypes';
import Logo from '@Common/Logo';
import {
  Dimens,
  Opacity,
  ThemeColor,
  ThemeText,
} from '@Utilities/Styles/GlobalStyles';
import TextInput from '@Common/TextInput';
import Button from '@Common/Button';
import ValidateString from '@Utilities/Tools/ValidateString';
import {getUserData} from '@Redux/Reducers/UserReducer';
import {IIconName} from '@Common/Icon';
import {statusBarDark, statusBarLight} from '@Redux/Reducers/DefaultReducer';

const SignInScreen = ({navigation}: IMainNavProp<'SignInScreen'>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(statusBarLight());
    return () => {
      dispatch(statusBarDark());
    };
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecured, setPasswordSecured] = useState(true);
  const [passwordError, setPasswordError] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string[]>([]);

  const passwordRef = useRef<RNInput>(null);

  const PasswordIconProp: {name: IIconName; onPress: () => void} = {
    name: passwordSecured ? 'eye' : 'eye-off',
    onPress: () => setPasswordSecured(!passwordSecured),
  };

  const verifyForm = () => {
    const emailValid = ValidateString(email, 'email');
    const passwordValid = ValidateString(password, 'password');
    if (emailValid.length > 0) {
      setEmailError(emailValid);
      return false;
    }
    if (passwordValid.length > 0) {
      setPasswordError(passwordValid);
      return false;
    }
    console.log('form verified');
    setEmailError([]);
    setPasswordError([]);
    return true;
  };

  const onSignInHandler = () => {
    console.log('sign in attempted', {email, password});

    if (!verifyForm()) return;
    dispatch(getUserData({email, password}));
  };

  return (
    <View style={styles.RootScreenContainer}>
      <View style={styles.HeaderContainer}>
        <View style={styles.LogoContainer}>
          <Logo color={ThemeColor.light} />
        </View>
        <Text style={[ThemeText.H2_Bold, styles.BrandText]}>FORTIUS</Text>
      </View>
      <View style={styles.ContentContainer}>
        <Text style={[ThemeText.H2_Regular, styles.ContentText]}>Sign In</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => passwordRef.current?.focus()}
          keyboardType="email-address"
          errorMessage={emailError[0]}
          // showLabel
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          // showLabel
          ref={passwordRef}
          secureTextEntry={passwordSecured}
          iconTrailing={PasswordIconProp}
          errorMessage={passwordError[0]}
        />
        <Button label="Sign In" onPress={onSignInHandler} />
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
    backgroundColor: ThemeColor.dark,
    padding: Dimens.padding,
    justifyContent: 'center',
  },
  HeaderContainer: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Dimens.padding * 2,
  },
  LogoContainer: {height: 100, width: 100},
  BrandText: {
    color: ThemeColor.light,
    letterSpacing: 12,
    marginTop: Dimens.radius * 2,
  },
  ContentContainer: {
    padding: Dimens.padding,
    backgroundColor: ThemeColor.light,
    borderRadius: Dimens.radius * 3,
  },
  ContentText: {marginBottom: Dimens.padding * 2},
});
