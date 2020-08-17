import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import {addItem} from '../redux/action/StockAction';

import {connect} from 'react-redux';

import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'stockDatabase.db'});

const Dashboard = ({stock, setStock, navigation}) => {
  useEffect(() => {
    // store data into reucer store
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
  const GetTotalItemRate = () => {
    let total = 0;

    if (stock[stock.length - 1] === undefined) {
      total = 0;
      return <Text>{total}</Text>;
    } else {
      let output = stock.filter(
        (arr) => arr.item_name == stock[stock.length - 1].item_name,
      );

      for (let i = 0; i < output.length; i++) {
        total += output[i].quantity;
      }
    }

    return (
      <Text>
        {stock[stock.length - 1].item_name} = {total}
      </Text>
    );
  };

  const grandTotal = stock.map((t) => t.quantity);
  const totalItems = (total, num) => total + num;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.touchContainer}
            onPress={() =>
              navigation.navigate('StockManage', {screen: 'StocksDetail'})
            }>
            <Text>
              Total Pieces =
              <Text style={{fontSize: 20, color: 'green', fontWeight: 'bold'}}>
                {' '}
                {grandTotal.reduce(totalItems, 0)}{' '}
              </Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchContainer}
            onPress={() => navigation.navigate('ItemName')}>
            {/* <Text> */}

            <Text style={{fontSize: 20, color: 'green', fontWeight: 'bold'}}>
              {' '}
              <GetTotalItemRate />{' '}
            </Text>
            {/* </Text> */}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchContainer}
            onPress={() => navigation.navigate('SearchItemsPage')}>
            <Text>Search Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchContainer}
            onPress={() => alert('pressed')}>
            <Text>On Testing</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchContainer}
            onPress={() => alert('pressed')}>
            <Text>On Testing</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchContainer}
            onPress={() => alert('pressed')}>
            <Text>On Testing</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchContainer}
            onPress={() => alert('pressed')}>
            <Text>On Testing</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  touchContainer: {
    borderWidth: 1,
    padding: 5,
    marginVertical: 10,
    height: 80,
    minWidth: '40%',
  },
});

const mapStateToProps = (state) => ({
  stock: state.stock,
});

const mapDispatchToProps = (dispatch) => ({
  setStock: (stk) => dispatch(addItem(stk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
