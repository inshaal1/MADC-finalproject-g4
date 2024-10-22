import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { heightRef, widthRef } from '../utils/Dimensions';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);
  const [showCreatedHistory, setShowCreatedHistory] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      const storedHistory = await AsyncStorage.getItem(showCreatedHistory ? 'qrHistory' : 'scanHistory');
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        setHistory(parsedHistory);
      } else {
        setHistory([]);
      }
    };

    fetchHistory();
  }, [showCreatedHistory]);

  const renderItem = ({ item }) => {
    if (!item.data || !item.timestamp) {
      return null;
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.data}</Text>
        <Text style={styles.dateText}>{item.timestamp}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <MaterialIcons name="menu" size={20 * widthRef} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setShowCreatedHistory(false)}
        >
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setShowCreatedHistory(true)}
        >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>

      {history.length > 0 ? (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent} 
        />
      ) : (
        <View style={styles.noHistoryContainer}>
          <Text style={styles.noHistoryText}>No history to display.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20 * heightRef,
    paddingTop: 50 * heightRef,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom:40 * heightRef
  },
  title: {
    fontSize: 40 * heightRef,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20 * heightRef,
  },
  button: {
    flex: 1,
    backgroundColor: '#ffcc00',
    borderRadius: 10,
    paddingVertical: 10 * heightRef,
    marginHorizontal: 5 * widthRef,
  },
  buttonText: {
    color: '#000',
    fontSize: 16 * heightRef,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#2e2e2e',
    padding: 15 * heightRef,
    borderRadius: 10,
    marginBottom: 10 * heightRef,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: '#fff',
    fontSize: 18 * heightRef,
  },
  dateText: {
    color: '#aaa',
    fontSize: 14 * heightRef,
  },
  noHistoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20 * heightRef,
  },
  noHistoryText: {
    color: '#fff',
    fontSize: 16 * heightRef,
  },
  flatListContent: {
    flexGrow: 1,
  },
});

export default HistoryScreen;
