import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Championship from './src/app/UI/championship/championship';
import { Auth0Provider } from 'react-native-auth0';
import Login from './src/app/UI/login/login';
import config from './auth0-configuration';

export default function App() {
  

  return (
     <Auth0Provider domain={config.domain} clientId={config.clientId}>
        {/* your application */}
        <View style={styles.container}>
          <Text>{config.clientId}</Text>
          <Text>{config.domain}</Text>
            <Login/>
        </View>
      </Auth0Provider>
    // <Auth0Provider domain={domain} clientId={clientId}>
    //   <View style={styles.container}>
    //     {/* <Championship />
    //     <StatusBar style="auto" /> */}
    //     <TouchableOpacity onPress={LoginButton}>
    //       <Text>Entrar</Text>
    //     </TouchableOpacity>
    //   </View>
    // </Auth0Provider>

    // com.diego-serrat.soccerbroadcast://dev-g0agga2c5dcqfwjm.us.auth0.com/ios/com.diego-serrat.soccerbroadcast/callback, 
    // com.diego-serrat.soccerbroadcast://dev-g0agga2c5dcqfwjm.us.auth0.com/android/com.diego-serrat.soccerbroadcast/callback
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
