import React from 'react';
import { StyleSheet, View } from 'react-native';

import Login from './UI/login';

export default function Index() {

  return (
      <View style={styles.container}>
          <Login/>
      </View>
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
