import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';

import COLORS from '@/app/shared/utils/colors';
import InputComponent from '../shared/components/input/input';
import ButtonComponent from '../shared/components/button/Button';
import { fetchLogin } from '../service/service-login';
import { getValueStorage, saveStorage } from '../service/service-storage';

export default function Login() {
    const { control } = useForm();

    useEffect(()  => {
      const getStorage = async () => {
        // const token = await getValueStorage('token');
        // if(token) {
        //   router.navigate('./UI/tabs/home');
        // }
      }

      getStorage();
    }, [])

   

    const onLogin = async (data: any) => {
      try {
        const res = await fetchLogin(data);
        if(res.token) {
          saveStorage('token', res.token);
          router.replace("../UI/tabs/home")
        }
      } catch (error) {    
        Alert.alert('Login', 'Email ou senha inválidos');
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
  