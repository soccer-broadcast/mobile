import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Credentials, useAuth0 } from 'react-native-auth0';

export default function Login() {
    const {authorize, clearSession, user, error, getCredentials, isLoading} = useAuth0();
    

    const onLogin = async () => {
      try {
        await authorize();
        let credentials  = await getCredentials() as Credentials;
        Alert.alert('AccessToken: ' + credentials.accessToken);
      } catch (e) {
        console.log(e)
        Alert.alert('Error: ' + e);
      }
    };
  
    const loggedIn = user !== undefined && user !== null;
  
    const onLogout = async () => {
      try {
        await clearSession();
      } catch (e) {
        console.log('Log out cancelled');
      }
    };
  
    // if (isLoading) {
    //   Alert.alert('Loading...');
    //   return <View style={styles.container}><Text>Loading</Text></View>;
    // }
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Auth0Sample - Login </Text>
        {user && <Text>You are logged in as {user.name}</Text>}
        {!user && <Text>You are not logged in</Text>}
        {error && <Text>{error.message}</Text>}
        <Button
          onPress={loggedIn ? onLogout : onLogin}
          title={loggedIn ? 'Log Out' : 'Log In'}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    header: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
  });
  