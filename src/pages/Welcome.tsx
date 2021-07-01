import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native'; 
import { RectButton } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

import Logo from '../assets/logo.png';
import fonts from '../styles/fonts';
import { useAuth } from '../hooks/authContext';

export function Welcome() {
  const { signIn, loading } = useAuth();

  return (
    <View style={styles.container}>
      <Image source={Logo} />

      <Text style={styles.title}>
        File {"\n"}
        <Text style={styles.subtitle}>Manager_</Text>
      </Text>
      
      <Text style={styles.description}>
        Uma aplicação que permite a 
        você realizar upload de arquivos para nuvem.
      </Text>

      {
        loading 
          ? <ActivityIndicator 
              color="#316F66" 
              size='large' 
              style={{ marginTop: 30 }}
            />  

          : <RectButton 
              style={styles.button}
              onPress={signIn}
            >
              <View style={styles.icon}>
                <AntDesign
                  name="github"
                  color="#FFF"
                  size={36}
                />
              </View>
              <Text style={styles.buttonText}>Entrar com o Github</Text>
            </RectButton>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#A2CCD1',
    paddingHorizontal: 40
  },
  title: {
    fontSize: 44,
    marginTop: 24,
    fontFamily: fonts.bold,
    color: '#000',
  },
  subtitle: {
    fontSize: 42,
    fontFamily: fonts.normal,
    color: '#000',
    fontWeight: '300'
  },
  description: {
    fontSize: 20,
    lineHeight: 33,
    color: '#000',
    fontFamily: fonts.normal,
  },
  button: {
    width: '100%',
    height: 64,
    marginTop: 46,
    backgroundColor: '#316F66',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 64,
    height: 64,
    borderRightWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'

  },
  buttonText: {
    flex: 1,
    color: '#ffff',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.normal
  }
});