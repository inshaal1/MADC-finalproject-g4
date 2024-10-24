import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { heightRef, widthRef } from '../utils/Dimensions';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);
  const [showCreatedHistory, setShowCreatedHistory] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false); // To track selection mode

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

  // Function to toggle selection of an item
  const handleLongPress = (item) => {
    setIsSelecting(true);
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Function to delete selected items
  const deleteSelectedItems = async () => {
    const updatedHistory = history.filter(item => !selectedItems.includes(item));
    setHistory(updatedHistory);
    setSelectedItems([]);
    setIsSelecting(false);
    await AsyncStorage.setItem(showCreatedHistory ? 'qrHistory' : 'scanHistory', JSON.stringify(updatedHistory));
  };

  // Function to handle Select All
  const selectAll = () => {
    if (selectedItems.length === history.length) {
      setSelectedItems([]); // Deselect all if already selected
    } else {
      setSelectedItems(history); // Select all items
    }
  };

  // Render an individual history item
  const renderItem = ({ item }) => {
    if (!item.data || !item.timestamp) {
      return null;
    }

    const isSelected = selectedItems.includes(item);
    
    return (
      <TouchableOpacity
        onLongPress={() => handleLongPress(item)}
        style={[
          styles.item, 
          isSelected && styles.selectedItem // Highlight selected items
        ]}
      >
        <Text style={styles.itemText}>{item.data}</Text>
        <Text style={styles.dateText}>{item.timestamp}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
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

      {isSelecting && (
        <View style={styles.selectionActions}>
          <TouchableOpacity style={styles.selectAllButton} onPress={selectAll}>
            <Text style={styles.selectAllText}>Select All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={deleteSelectedItems}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

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
    paddingBottom: 40 * heightRef,
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
  selectedItem: {
    backgroundColor: '#ff8800', 
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
  selectionActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10 * heightRef,
  },
  selectAllButton: {
    backgroundColor: '#FFA500',
    padding: 10 * heightRef,
    borderRadius: 10,
    marginHorizontal:10* heightRef
  },
  selectAllText: {
    color: '#000',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10 * heightRef,
    borderRadius: 10,
    marginHorizontal:10* heightRef
  },
  deleteText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default HistoryScreen;
