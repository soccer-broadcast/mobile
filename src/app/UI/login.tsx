import React, { useEffect, useRef } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';

import COLORS from '@/app/shared/utils/colors';
import InputComponent from '../shared/components/input/input';
import ButtonComponent from '../shared/components/button/Button';
import { fetchLogin } from '../service/service-login';
import { getValueStorage, saveStorage } from '../service/service-storage';

export default function Login() {
    const { control, handleSubmit, formState: { errors }} = useForm();
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    useEffect(()  => {
      const getStorage = async () => {
        const token = await getValueStorage('token');
        if(token) {
          router.push('./UI/tabs/home');
        }
      }

      getStorage();
    }, [])

    const onLogin = async (data: any) => {
      const { login, password } = data;

      try {
        const res = await fetchLogin({ login, password });
        if(res.token) {
          saveStorage('token', res.token);
          router.push("../UI/tabs/home")
        }
      } catch (error) {    
        Alert.alert('Login', 'Email ou senha inválidos');
      }
    };
  
    // if (isLoading) {
    //   return <View style={styles.container}><Text>Loading</Text></View>;
    // }

    return (
      <View style={styles.container}>
        <Image 
          style={styles.image}
          source={require('../../../assets/soccer.png')}/>
        <Text style={styles.text}>Onde Assistir</Text>
        <InputComponent 
          icon='mail' 
          ref={emailRef} 
          error={errors.login?.message}
          inputProps={{
            secureTextEntry: false,
            placeholder: 'Email',
            autoCapitalize: 'none',
          }}
          formProps={{
            name: 'login',
            control,
            rules: {
              required: 'Email é obrigatório',
            }
          }} 
        />
        <InputComponent 
          icon='lock' 
          ref={passwordRef}
          error={errors.password?.message}
          inputProps={{
            secureTextEntry: true,
            placeholder: 'Senha'
          }}
          formProps={{
            name: 'password',
            control,
            rules: {
              required: 'Senha é obrigatório'
            }
          }}
        />
        <ButtonComponent onPress={handleSubmit(onLogin)} title='Entrar' activeOpacity={0.5} />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      padding: 20
    },
    header: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    image: {
      width: 200,
      height: 150
    },
    text: {
      textAlign: 'center',
      color: '#0D80BF',
      fontSize: 20,
      fontFamily: 'Helvetica',
      fontWeight: 'bold',
      marginBottom: 20
    }
  });
  