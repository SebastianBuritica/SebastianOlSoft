import React, {useState} from 'react';
import {SafeAreaView, View, Image} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store/store';
import {loginAsync} from '../store/thunks';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core';
import {StackNavigatorParams} from '../navigation/AppNavigator';

const LoginForm = () => {
  const navigation =
    useNavigation<NavigationProp<StackNavigatorParams, 'Login'>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const validateEmail = (email: string) => {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
    return pattern.test(email);
  };

  const onLoginPress = async () => {
    let isValid = true;
    setUsernameError('');
    setPasswordError('');

    if (!username) {
      setUsernameError('Enter a value');
      isValid = false;
    } else if (!validateEmail(username)) {
      setUsernameError('Enter a valid email');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Enter a value');
      isValid = false;
    }

    if (isValid) {
      setIsLoading(true);

      try {
        await dispatch(loginAsync({user: username, password}));
        navigation.navigate('Dashboard');
      } catch (error) {
        console.error('Login failed:', error);
      }

      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: 16}}>
        <Image
          source={require('../assets/dittoo.png')}
          style={{
            width: '100%',
            height: 200,
            aspectRatio: 1,
            marginBottom: 140,
          }}
          resizeMode="contain"
        />
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
          Hola! Bienvenido a olsoftware
        </Text>
        <TextInput
          label="Email"
          value={username}
          onChangeText={text => {
            setUsernameError('');
            setUsername(text);
          }}
          mode="outlined"
          style={{marginBottom: 10}}
        />
        {usernameError ? (
          <Text style={{color: 'red', marginBottom: 10}}>{usernameError}</Text>
        ) : null}
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => {
            setPasswordError('');
            setPassword(text);
          }}
          secureTextEntry
          mode="outlined"
          style={{marginBottom: 10}}
        />
        {passwordError ? (
          <Text style={{color: 'red', marginBottom: 10}}>{passwordError}</Text>
        ) : null}
        <Button
          mode="contained"
          onPress={onLoginPress}
          loading={isLoading}
          style={{marginTop: 10}}
          disabled={isLoading}>
          Ingresar
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginForm;
