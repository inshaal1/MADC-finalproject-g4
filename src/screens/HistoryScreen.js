import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; // For the menu icon
import { useNavigation } from '@react-navigation/native';

const HistoryScreen = () => {
  const navigation = useNavigation(); // Get the navigation prop
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const storedHistory = await AsyncStorage.getItem('scanHistory');
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        console.log('Fetched history:', parsedHistory);
        setHistory(parsedHistory);
      }
    };

    fetchHistory();
  }, []);

  const renderItem = ({ item }) => {
    if (!item.data || !item.timestamp) {
      return null; // Skip rendering if data or timestamp is missing
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
        <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
          <MaterialIcons name="menu" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonActive}>
          <Text style={styles.buttonTextActive}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonInactive}>
          <Text style={styles.buttonTextInactive}>Create</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonActive: {
    backgroundColor: '#ffcc00',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonInactive: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonTextActive: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextInactive: {
    color: '#fff',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#2e2e2e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: '#fff',
    fontSize: 18,
  },
  dateText: {
    color: '#aaa',
    fontSize: 14,
  },
});

export default HistoryScreen;
