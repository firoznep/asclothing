import React, {useState} from 'react';
import {Text, View, Alert, SafeAreaView} from 'react-native';

// components
import CustomInput from '../components/CustomInput';
import CustomBtn from '../components/CustomBtn';

import {Picker} from '@react-native-community/picker';

// database
import {openDatabase} from 'react-native-sqlite-storage';
import {connect} from 'react-redux';
var db = openDatabase({name: 'stockDatabase.db'});

const DeleteStock = ({navigation, stock}) => {
  let [itemName, setItemName] = useState('Select name');
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

  // FOR GETTING ITEM_NAME FROM STOCK AND PASSED TO PICKER
  let nameArr = stock.map((val) => val.item_name);
  let arrSet = new Set(nameArr);
  let uniqueArr = [...arrSet];

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1}}>
          {/* SIZE PICKER*/}
          <View
            style={{
              marginHorizontal: 15,
              marginTop: 10,
              borderColor: '#689F38',
              borderWidth: 1,
            }}>
            <Picker
              // style={{your_style}}
              mode="dropdown"
              selectedValue={itemName}
              onValueChange={(n) => {
                setItemName(n);
              }}>
              <Picker.Item label="Select name" value="" />
              {uniqueArr.map((elm) => {
                return <Picker.Item label={elm} value={elm} key={elm} />;
              })}
            </Picker>
          </View>

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

const mapStateToProps = (state) => ({
  stock: state.stock,
});

export default connect(mapStateToProps)(DeleteStock);
