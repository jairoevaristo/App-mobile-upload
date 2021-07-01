import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Modal,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import uuid from 'react-native-uuid';

import { api } from '../services/api';

import { CardContainer } from '../components/CardContainer';
import { Header } from '../components/Header';
import { ModalUpload } from '../components/ModalUpload';

import Logo from '../assets/logo.png';
import fonts from '../styles/fonts';
import { useAuth } from '../hooks/authContext';

type ImageData = {
  uri: string;
  name: string;
  size: number | undefined;
}

export function Upload() {
  const { user } = useAuth();

  const [image, setImage] = useState<ImageData>({} as ImageData);
  const [showModal, setShowModal] = useState(false);

  async function handleGetImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      const imageURI = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 300, height: 300 } }]
      )

      const { size } = await FileSystem.getInfoAsync(imageURI.uri);

      setImage({
        uri: imageURI.uri,
        size,
        name: `Arquivo ${uuid.v4()}`,
      });
    }
  }

  async function handleUpload() {
    setShowModal(true);
    const data = new FormData();

    data.append('file', {
      uri: image.uri,
      type: 'image/jpg',
      name: image.name
    } as any);

    try {
      await api.post('/upload', data);
      setShowModal(false);
    } catch (err) {
      alert('Não conseguimos enviar sua imagem, tente novamente mais tarde :)');
      console.log(err.message);
    }
    setShowModal(false);
  }

  useEffect(() => {
    async function handleImage() {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Ops, precisamos acessar seus arquivos');
      }
    }

    handleImage();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        
        <Header 
          title={`Olá ${user.name}`} 
          avatar_url={user.avatar_url}
        />

        <View style={styles.info}>
          <Text style={styles.textUpload}>
            Fazer Upload
          </Text>
          <Text style={styles.subtitle}>
            Clique na imagem para selecionar...
          </Text>
        </View>

        <CardContainer>
          <View style={styles.content}>
            <TouchableOpacity 
              style={styles.contentImage} 
              onPress={handleGetImage} 
              activeOpacity={1}
            >
              {
                image.uri 
                ? (<Image 
                      source={{ uri: image.uri }} 
                      resizeMode="contain" 
                      style={styles.imageStyle}    
                    />
                  )

                : (
                  <Image 
                    source={Logo} 
                    resizeMode="contain" 
                    style={styles.imageStyle} 
                  />
                  ) 
              }
              
            </TouchableOpacity>
            <RectButton 
              style={styles.button}
              onPress={handleUpload}
            >
              <View style={styles.icon}>
                <AntDesign
                  name="upload"
                  color="#FFF"
                  size={24}
                />
              </View>
              <Text style={styles.buttonText}>Realizar upload</Text>
            </RectButton>
          </View>
        </CardContainer>
        
        <Modal transparent animationType="slide" visible={showModal}>
          <View style={{ flex: 1 }} />
          <ModalUpload />
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#A2CCD1',
    paddingTop: 60,
  },
  info: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 40,
    justifyContent: 'center'
  },
  textUpload: {
    fontFamily: fonts.bold,
    fontSize: 36, 
    marginTop: 30,
  },
  subtitle: {
    fontFamily: fonts.normal,
    fontSize: 18, 
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  imageStyle: {
    width: 260,
    height: 260,
    borderRadius: 130,
  },
  contentImage: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderColor: 'rgba(255, 255, 255, 0.50)',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  button: {
    width: '80%',
    height: 60,
    marginTop: 20,
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
})
