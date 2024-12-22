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
        <View style={styles.container}>
            <Login/>
        </View>
      </Auth0Provider>
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
