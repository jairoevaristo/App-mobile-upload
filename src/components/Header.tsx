import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import fonts from '../styles/fonts';

type HeaderProps = {
  title: string;
  avatar_url: string;
}

export function Header({ title, avatar_url }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.myFiles}>
        {title}
      </Text>
      <View style={styles.imageBorder} />
        <Image
          source={{ uri: avatar_url }} 
          style={styles.image}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 7,
    position: 'relative',
  },
  imageBorder: {
    width: 75,
    height: 75,
    borderRadius: 7,
    position: 'absolute',
    borderColor: '#F0EBEB',
    borderWidth: 2,
    right: 35,
    top: 10,
  },
  myFiles: {
    fontSize: 28,
    fontFamily: fonts.bold,
    maxWidth: 150,
  }
});