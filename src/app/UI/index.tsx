import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Credentials, useAuth0 } from 'react-native-auth0';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import COLORS from '@/app/shared/utils/colors';
import { QueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import InputComponent from '../shared/components/input/input';
import ButtonComponent from '../shared/components/button/Button';
import { fetchLogin } from '../service/service-login';

export default function Login() {
    const { control } = useForm();


    useEffect(() => {
      // if(user) {
      //   router.navigate('./UI/championship/championship');
      //   // router.navigate('../UI/login/login');
      //   console.log('redirect');
      // }
    }, [])

    const onLogin = async (data: any) => {
      try {
        const res = await fetchLogin(data);
        if(res.token) {
          router.replace("../UI/tabs/home")
        }
      } catch (error) {
        console.log('error');    
      }
    };
    const onLogout = async () => {
      try {
        // await clearSession();
      } catch (e) {
        Alert.alert('Error logout: ' + e);
      }
    };

    const isPressedButton = () => {
      const { _formValues } = control;
      onLogin(_formValues);
    }
  
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
          placeholder='Email' 
          icon='mail' 
          secureTextEntry={false} 
          formProps={{
            name: 'email',
            control
          }} />
        <InputComponent 
          placeholder='Senha' 
          icon='lock' 
          secureTextEntry={true} 
          formProps={{
            name: 'password',
            control
          }}/>
        <ButtonComponent pressed={isPressedButton} title='Entrar' activeOpacity={0.5} />
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
  