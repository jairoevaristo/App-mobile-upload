import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

type CardContainerProps = {
  children: ReactNode;
}

export function CardContainer({ children }: CardContainerProps) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 30,
    backgroundColor: '#E9EDEE'
  }
})