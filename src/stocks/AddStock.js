import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import CustomBtn from '../components/CustomBtn';
import CustomInput from '../components/CustomInput';

import {openDatabase} from 'react-native-sqlite-storage';
import {connect} from 'react-redux';

var db = openDatabase({name: 'stockDatabase.db'});

const AddStock = ({navigation, stock}) => {
  let arr = stock.map((t) => t.item_name);

  let [itemName, setItemName] = useState('');
  let [itemQuantity, setItemQuantity] = useState('');
  let [description, setDescription] = useState('No Description!');
  let [date, setDate] = useState(new Date().toDateString());

  let add_stock = () => {
    if (!itemName) {
      alert('Please fill name');
      return;
    }

    if (!itemQuantity) {
      alert('Please fill Quantity');
      return;
    }

    // if (arr.includes(itemName)) {
    //   Alert.alert(
    //     'Name already exist!',
    //     'Do you want to Update ?',
    //     [
    //       {
    //         text: 'Cancel',
    //         onPress: () => {
    //           return;
    //         },
    //         style: 'cancel',
    //       },
    //       {text: 'OK', onPress: () => navigation.navigate('UpdateStock')},
    //     ],
    //     {cancelable: false},
    //   );
    //   return;
    // }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO stock_table (item_name, item_quantity, description, date) VALUES (?,?,?,?)',
        [
          itemName.trim().toLowerCase(),
          itemQuantity.trim(),
          description.trim().toLowerCase(),
          date,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are added item Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('StocksDetail'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Process Failed');
          }
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
                placeholder="Enter item Name"
                onChangeText={(name) => setItemName(name)}
                style={{padding: 10}}
              />
              <CustomInput
                placeholder="Enter Item Quantity"
                onChangeText={(qnt) => setItemQuantity(qnt)}
                maxLength={10}
                keyboardType="numeric"
                style={{padding: 10}}
              />
              <CustomInput
                placeholder="Description"
                onChangeText={(des) => setDescription(des)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <CustomBtn title="Submit" onBtnPress={add_stock} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({stock}) => ({
  stock,
});

export default connect(mapStateToProps)(AddStock);
