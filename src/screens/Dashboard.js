import React, {useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {addItem} from '../redux/action/StockAction';

import {openDatabase} from 'react-native-sqlite-storage';

import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

let db = openDatabase({name: 'stockDatabase.db'});

const Dashboard = ({stock, setStock, navigation}) => {
  useEffect(() => {
    showAllData();
  }, []);

  let showAllData = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM stock_table', [], (tx, results) => {
        if (stock.length < results.rows.length) {
          for (let i = 0; i < results.rows.length; ++i) {
            setStock(results.rows.item(i));
          }
        }
      });
    });
  };

  // get total plazzo
  const getTotalItemRate = () => {
    let output = stock.filter((arr) => arr.item_name == stock[0].item_name);
    let total = 0;

    for (let i = 0; i < output.length; i++) {
      total += output[i].item_quantity;
    }

    return total;
  };

  const grandTotal = stock.map((t) => t.item_quantity);
  const totalItems = (total, num) => total + num;

  return (
    <ScrollView>
      <TouchableOpacity
        style={{borderWidth: 2, padding: 15}}
        onPress={() =>
          navigation.navigate('StockManage', {screen: 'StocksDetail'})
        }>
        <Text>
          Total Pieces =
          <Text style={{fontSize: 20, color: 'green', fontWeight: 'bold'}}>
            {' '}
            {grandTotal.reduce(totalItems, 0)}{' '}
          </Text>
          avalable.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{borderWidth: 2, padding: 15, marginVertical: 10}}
        onPress={() => navigation.navigate('ItemName')}>
        <Text>
          Total Plazzo =
          <Text style={{fontSize: 20, color: 'green', fontWeight: 'bold'}}>
            {' '}
            {getTotalItemRate()}{' '}
          </Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  stock: state.stock,
});

const mapDispatchToProps = (dispatch) => ({
  setStock: (stk) => dispatch(addItem(stk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
