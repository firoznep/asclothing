import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';
import CustomInput from '../components/CustomInput';
import CustomBtn from '../components/CustomBtn';

var db = openDatabase({name: 'stockDatabase.db'});

const UpdateStock = ({navigation}) => {
  let [itemId, setItemId] = useState('');
  let [itemName, setItemName] = useState('');
  let [quantity, setQuantity] = useState('');
  let [description, setDescription] = useState('');
  let [date, setDate] = useState(new Date().toDateString());

  let updateAllStates = (name, quantity, description) => {
    setItemName(name);
    setQuantity(quantity);
    setDescription(description);
    // setDescription(date);
  };

  let searchItem = () => {
    // console.log(itemId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM stock_table where item_id = ?',
        [itemId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.item_name,
              res.item_quantity,
              res.description,
              // res.date,
            );
          } else {
            alert('No item found');
            updateAllStates('', '', '');
          }
        },
      );
    });
  };

  let updateStock = () => {
    // console.log(itemId, itemName, quantity, description);

    if (!itemId) {
      alert('Please fill item id');
      return;
    }
    if (!itemName) {
      alert('Please fill name');
      return;
    }
    if (!quantity) {
      alert('Please fill quantity');
      return;
    }
    if (!description) {
      alert('Please fill description');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE stock_table set item_name=?, item_quantity=? , description=?, date=? where item_id=?',
        [itemName, quantity, description, date, itemId],
        (tx, results) => {
          // console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'item updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Dashboard'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Updation Failed');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <CustomInput
                placeholder="Enter item Id"
                style={{padding: 10}}
                onChangeText={(itemId) => setItemId(itemId)}
              />
              <CustomBtn title="Search item" onBtnPress={searchItem} />
              <CustomInput
                placeholder="Enter Name"
                value={itemName}
                style={{padding: 10}}
                onChangeText={(itemName) => setItemName(itemName)}
              />
              <CustomInput
                placeholder="Enter quantity"
                value={'' + quantity}
                onChangeText={(quantity) => setQuantity(quantity)}
                maxLength={10}
                style={{padding: 10}}
                keyboardType="numeric"
              />
              <CustomInput
                value={description}
                placeholder="description"
                onChangeText={(description) => setDescription(description)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <CustomBtn title="Update item" onBtnPress={updateStock} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateStock;
