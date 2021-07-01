import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import fileSize from 'filesize';
import { RectButton } from 'react-native-gesture-handler';

import fonts from '../styles/fonts';

type CardFileProps = {
  uri: string;
  name: string;
  size: number;
}

export function CardFile({ name, uri, size }: CardFileProps) {
  const formatedSize = fileSize(size);
  const formatedNameFile = name.substring(0, 15);

  return (
    <RectButton style={styles.container}>
      <Image  
        source={{ uri: `http://192.168.5.8:3333/${uri}` }} 
        style={styles.image}
        resizeMode="contain"
        width={70}
        height={70}
      />

        <View style={styles.infoFile}>
          <Text style={styles.filename} numberOfLines={1}>
            {formatedNameFile}
          </Text>

          <Text style={styles.size} numberOfLines={1}>
            {formatedSize}
          </Text>
        </View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 90,
    marginBottom: 20,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#ffff'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 7,
  },
  infoFile: {
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
  },
  filename: {
    fontSize: 20,
    fontFamily: fonts.regular,
  },
  size: {
    fontSize: 16,
    fontFamily: fonts.normal
  }
})