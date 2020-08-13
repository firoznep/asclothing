import React, {useState} from 'react';
import {Button, Text, View, Alert, SafeAreaView} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';
import CustomInput from '../components/CustomInput';
import CustomBtn from '../components/CustomBtn';

var db = openDatabase({name: 'stockDatabase.db'});

const DeleteStock = ({navigation}) => {
  let [itemName, setItemName] = useState('');
  let [itemId, setItemId] = useState('');

  let deleteStock = () => {
    if (itemName.length > 0) {
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
    }

    if (itemId.length > 0) {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM  stock_table where item_id=?',
          [itemId],
          (tx, results) => {
            // console.log('Results', results.rowsAffected);
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
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <CustomInput
            placeholder="Enter item name"
            onChangeText={(itemName) => setItemName(itemName)}
            style={{padding: 10}}
          />
          <Text style={{justifyContent: 'center'}}>OR</Text>

          <CustomInput
            placeholder="Enter item id"
            onChangeText={(itemId) => setItemId(itemId)}
            style={{padding: 10}}
          />
          <CustomBtn title="Delete" onBtnPress={deleteStock} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteStock;
