import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Auth0Provider } from 'react-native-auth0';
import Login from './UI';
import config from '../../auth0-configuration';

export default function Index() {
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
