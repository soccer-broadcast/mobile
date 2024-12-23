import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Credentials, useAuth0 } from 'react-native-auth0';
import { Image } from 'expo-image';
import { COLORS } from '../../shared/utils/color-system';
import { FONTS } from '../../shared/utils/fonts-system';
import ButtonComponent from '../../shared/components/button/Button';


export default function Login() {
    const { authorize, clearSession, user, getCredentials, isLoading } = useAuth0();
    const [ credentials, setCredentials ] = useState<Credentials>();

    const onLogin = async () => {
      try {
        await authorize();
        const credentials  = await getCredentials() as Credentials;
        setCredentials(credentials);
      } catch (e) {
        Alert.alert('Error: ' + e);
      }
    };
  
    // const onLogout = async () => {
    //   try {
    //     await clearSession();
    //   } catch (e) {
    //     Alert.alert('Error logout: ' + e);
    //   }
    // };
  
    if (isLoading) {
      return <View style={styles.container}><Text>Loading</Text></View>;
    }
  
    const isPressedButton = () => {

      if(!user) {
        onLogin();
      } else {
        console.log('goTo Home');
        // navigation.navigate('Home')
      }
    }

    return (
      <View style={styles.container}>
        <Image 
          style={styles.image}
          source={require('../../../../assets/soccer.png')}/>
        {/* {user && <ButtonComponent pressed={isPressedButton} title='Log Out' />} */}
        <Text style={styles.text}>Onde Assistir Seu Jogo </Text>
        {!user && <ButtonComponent pressed={isPressedButton} title='Entrar' activeOpacity={0.5}/>}
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
      color: COLORS.meduim_blue,
      fontSize: 20,
      fontFamily: FONTS.regular,
      fontWeight: 'bold',
      marginBottom: 50
    }
  });
  