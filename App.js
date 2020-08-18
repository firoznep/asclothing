import 'react-native-gesture-handler';

import React, {useEffect} from 'react';

// navigations
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

// screens
import StockManage from './src/stocks/StockManage';
import NavBar from './src/screens/NavBar';

import SplashScreen from 'react-native-splash-screen';

import {openDatabase} from 'react-native-sqlite-storage';
import GetLocalImage from './src/imagePicker/imagePicker';
let db = openDatabase({name: 'stockDatabase.db'});

const drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();

    // CREATE TABLE
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='stock_table'",
        [],
        function (tx, res) {
          // console.log('table:', res);
          if (res.rows.length == 0) {
            txn.executeSql(
              'DROP TABLE IF EXISTS stock_table',
              [],
              (tx, res) => {
                console.log('table deleted');
              },
            );
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS stock_table(item_id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR(50), img_data VARCHAR(255), item_name VARCHAR(50), item_color VARCHAR(20), item_size VARCHAR(20), quantity INT(10), unit VARCHAR(20), unit_rate INT(10),total_amount INT(50), description VARCHAR(100))',
              [],
              (tx, res) => {
                console.log('table created');
              },
            );
          }
        },
      );
    });
  }, []);

  return (
    <NavigationContainer>
      <drawer.Navigator initialRouteName="NavBar">
        <drawer.Screen name="Dashboard" component={NavBar} />
        <drawer.Screen name="StockManage" component={StockManage} />
        <drawer.Screen name="GetLocalImage" component={GetLocalImage} />
      </drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
