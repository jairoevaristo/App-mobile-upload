import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Lottie from 'lottie-react-native';

import Animation from '../assets/cloud.json';
import fonts from '../styles/fonts';

export function ModalUpload() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Aguarde alguns instantes...
      </Text>
      
      <Text style={styles.subtitle}>
        Estamos enviando seu arquivo para nosso servidor.
      </Text>

        <View style={styles.contentProgress}>
          <ActivityIndicator color="#316F66" size='large' />  
  
        <Lottie 
          source={Animation}
          autoPlay
          loop
          style={styles.animated}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: '#0A444A',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: '#fff',
  },
  subtitle: {
    fontFamily: fonts.light,
    fontSize: 18,
    color: '#fff',
  },
  contentProgress: {
    width: '100%',
  },
  porcent: {
    fontSize: 18,
    padding: 10,
    fontFamily: fonts.bold,
    alignSelf: 'flex-end',
    color: '#fff'
  },
  progressBar: {
    height: 10, 
    borderRadius: 5, 
    backgroundColor: '#fff',
    position: 'relative',
  },
  progress: {
    height: 10, 
    borderRadius: 5, 
    backgroundColor: '#316F66',
    position: 'absolute'
  },
  animated: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    width: 150,
    height: 150,
  }
})