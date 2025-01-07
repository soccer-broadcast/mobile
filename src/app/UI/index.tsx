import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Credentials, useAuth0 } from 'react-native-auth0';
import { Image } from 'expo-image';
import ButtonComponent from '../shared/components/button/Button';
import { router } from 'expo-router';
import COLORS from '@/app/shared/utils/colors';
import { QueryClient } from '@tanstack/react-query';

export default function Login() {
    const { authorize, clearSession, user, getCredentials, isLoading } = useAuth0();
    const [ credentials, setCredentials ] = useState<Credentials>();


    useEffect(() => {
      // if(user) {
      //   router.navigate('./UI/championship/championship');
      //   // router.navigate('../UI/login/login');
      //   console.log('redirect');
      // }
    }, [])

    const onLogin = async () => {
      try {
        await authorize();
        const credentials  = await getCredentials() as Credentials;
        setCredentials(credentials);
      } catch (e) {
        Alert.alert('Error: ' + e);
      }
    };
  
    const onLogout = async () => {
      try {
        await clearSession();
      } catch (e) {
        Alert.alert('Error logout: ' + e);
      }
    };

    const isPressedButton = () => {
      router.replace("../UI/tabs/home")
    }
  
    if (isLoading) {
      return <View style={styles.container}><Text>Loading</Text></View>;
    }

    return (
      <View style={styles.container}>
        <Image 
          style={styles.image}
          source={require('../../../assets/soccer.png')}/>
        <Text style={styles.text}>Onde Assistir</Text>
        <ButtonComponent pressed={isPressedButton} title='Entrar' activeOpacity={0.5}/>
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
      marginBottom: 50
    }
  });
  