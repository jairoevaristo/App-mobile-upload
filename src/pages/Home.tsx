import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { CardContainer } from '../components/CardContainer';
import { CardFile } from '../components/CardFile';
import { Header } from '../components/Header';

import fonts from '../styles/fonts';
import { api } from '../services/api';
import { useAuth } from '../hooks/authContext';
import fileSize from 'filesize';

type FileData = {
  original_name: string;
  id: string;
  size: number;
  url_link: string;
}

export function Home() {
  const { user } = useAuth();

  const [file, setFile] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetch() {
    try {
      const response = await api.get('/');
      setFile(response.data);
    } catch (err) {
      console.log('Server', err);
    } finally {
      setLoading(false);
    }
      
  }

  function sumSizeFile() {
    let size = 0;
    for (let index of file) {
      size += index.size
    }
    return fileSize(size);
  }

  useFocusEffect(useCallback(() => {
    fetch();
  }, []))

  return (
    <SafeAreaView style={styles.container}>
      
      <Header 
        title="Meus Arquivos" 
        avatar_url={user.avatar_url}
      />

      {
        loading 
          ? <View style={{ paddingVertical: 20 }} />
          : <>
              <View style={styles.info}>
                
                <Text style={styles.storage}>
                  Total Usado {"\n"}
                  {sumSizeFile()}
                </Text>

                <View style={styles.contentItems}>
                  <Text style={styles.items}>{file.length}</Text>
                  <Text style={styles.itemsText}>itens</Text>
                </View>

                </View>
            </>
      }
      <CardContainer>

        { !file.length && <Text>Sem arquivos...</Text> }

        {
          loading 
            ? <ActivityIndicator 
                color="#316F66" 
                size='large' 
              />  
            : <FlatList 
                data={file}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                  <CardFile
                    name={item.original_name}
                    size={item.size} 
                    uri={item.url_link}
                  />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                style={styles.myFilesItemsList}
              />
        }
      </CardContainer>
    </SafeAreaView>
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
    paddingVertical: 30,
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'space-between'
  },
  storage: {
    fontFamily: fonts.normal,
    fontSize: 24, 
  },
  contentItems: {
    alignItems: 'flex-end'
  },
  items: {
    fontFamily: fonts.bold,
    fontSize: 28, 
  },
  itemsText: {
    fontFamily: fonts.normal,
    marginTop: -15,
    fontSize: 24, 
  },
  input: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    fontSize: 18,
    fontFamily: fonts.normal,
  },
  myFilesItemsList: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 26
  }
})