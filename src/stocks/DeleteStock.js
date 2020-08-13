import React, {useState} from 'react';
import {Text, View, Alert, SafeAreaView} from 'react-native';

// components
import CustomInput from '../components/CustomInput';
import CustomBtn from '../components/CustomBtn';

// database
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'stockDatabase.db'});

const DeleteStock = ({navigation}) => {
  let [itemName, setItemName] = useState('');
  let [itemId, setItemId] = useState('');

  let deleteStock = () => {
    if (itemName.length > 0) {
      Alert.alert(
        'Warning',
        'Are you sure want to delete',
        [
          {
            text: 'Cancel',
            onPress: () => {
              return;
            },
          },
          {
            text: 'Ok',
            onPress: () => getDbName(),
          },
        ],

        {cancelable: false},
      );
    }

    if (itemId.length > 0) {
      Alert.alert(
        'Warning',
        'Are you sure want to delete',
        [
          {
            text: 'Cancel',
            onPress: () => {
              return;
            },
          },
          {
            text: 'Ok',
            onPress: () => getDbId(),
          },
        ],

        {cancelable: false},
      );
    }
  };

  const getDbName = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  stock_table where item_name=?',
        [itemName],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Item deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('StocksDetail'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid Item-name');
          }
        },
      );
    });
  };

  const getDbId = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  stock_table where item_id=?',
        [itemId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Item deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('StocksDetail'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid Item-id');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <CustomInput
            placeholder="Enter item name"
            onChangeText={(itemName) => setItemName(itemName)}
            style={{padding: 10}}
            value={itemName}
            onFocus={() => setItemId('')}
          />
          <Text style={{fontSize: 24}}>OR</Text>

          <CustomInput
            placeholder="Enter item id"
            onChangeText={(itemId) => setItemId(itemId)}
            style={{padding: 10}}
            value={itemId}
            onFocus={() => setItemName('')}
          />
          <CustomBtn
            style={{backgroundColor: 'red'}}
            title="Delete"
            onBtnPress={deleteStock}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteStock;
