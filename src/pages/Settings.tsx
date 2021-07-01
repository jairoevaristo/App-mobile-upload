import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Text,
  StyleSheet,
  Alert
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather, Ionicons } from '@expo/vector-icons';

import { useAuth } from '../hooks/authContext';

import fonts from '../styles/fonts';

export function Settings() {
  const { user, signOut } = useAuth();
  
  function handleSignOut() {
    Alert.alert('È um adeus então...', 'Deseja realmente sair?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => signOut()
      }
    ])
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground 
        source={{ uri: user.avatar_url }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.description}>
          {user.bio}
        </Text>

        <View style={styles.wrapper}>
          <View style={styles.wrapperInfo}>
            <Feather
              name="mail"
              color="#316F66"
              size={24}
            />
            <Text style={styles.titleInfo}>
              {user.email}
            </Text>
          </View>

          <View style={styles.wrapperInfo}>
            <Feather
              name="git-merge"
              color="#316F66"
              size={24}
            />
            <Text style={styles.titleInfo}>
              Respositórios publicos: {user.public_repos}
            </Text>
          </View>

          <View style={styles.wrapperInfo}>
            <Ionicons 
              name="people-outline" 
              color="#316F66"
              size={24}
            />
            <Text style={styles.titleInfo}>
              Seguidores: {user.followers}
            </Text>
          </View>
        </View>
        
        <RectButton 
          style={styles.button}
          onPress={handleSignOut}
        >
          <View style={styles.icon}>
          <Feather 
            name="log-out" 
            size={24} 
            color="#FFF" />
          </View>
          <Text style={styles.buttonText}>Sair do App</Text>
        </RectButton>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingTop: 30,
    backgroundColor: '#E9EDEE'
  },
  image: {
    width: '100%',
    height: 250
  },
  description: {
    flex: 1,
    fontFamily: fonts.bold,
    paddingHorizontal: 20,
    fontSize: 20,
    lineHeight: 28
  },
  wrapper: {
    marginTop: 40,
    paddingHorizontal: 20
  },
  wrapperInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleInfo: {
    fontSize: 16,
    fontFamily: fonts.normal,
    marginLeft: 6,
  },
  button: {
    width: '80%',
    height: 60,
    marginTop: 60,
    backgroundColor: '#E51C44',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
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