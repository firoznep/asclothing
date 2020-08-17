import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  RefreshControl,
  FlatList,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';

import {openDatabase} from 'react-native-sqlite-storage';
import {addItem, resetState} from '../redux/action/StockAction';
let db = openDatabase({name: 'stockDatabase.db'});

const StockDetail = ({stock, setStock, setResetState}) => {
  const [refreshing, setRefreshing] = useState(false);

  // Refreshed controle
  const onRefresh = React.useCallback(() => {
    setResetState();

    setRefreshing(true);

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM stock_table', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          setStock(results.rows.item(i));
        }

        // }
      });
    });
    setRefreshing(false);
  }, [refreshing]);

  let listItemView = (item) => {
    return (
      <View
        key={item.item_id}
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderColor: 'red',
          borderWidth: 2,
          margin: 10,
        }}>
        {/* ITEM DATE AND ID */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            marginBottom: 10,
          }}>
          <Text>Item Id = {item.item_id}</Text>
          <Text style={{padding: 2}}>{item.date}</Text>
        </View>

        {/* ITEM NAME */}
        <Text>
          Item Name ={' '}
          <Text style={{color: '#E91E63', fontWeight: 'bold'}}>
            {item.item_name}
          </Text>
        </Text>

        {/* ITEM QUANTITY */}
        <Text>
          Item in stock ={' '}
          <Text style={{fontSize: 20, color: '#C2185B', fontWeight: 'bold'}}>
            {item.quantity}
          </Text>
        </Text>

        {/* ITEM COLOR */}
        <Text>
          Color = <Text>{item.item_color}</Text>
        </Text>

        {/* ITEM size */}
        <Text>
          Size = <Text>{item.item_size}</Text>
        </Text>

        {/* ITEM unit */}
        <Text>
          Unit = <Text>{item.unit}</Text>
        </Text>

        {/* ITEM unit rate */}
        <Text>
          U. R. = <Text>U3{item.unit_rate}6R</Text>
        </Text>

        {/* TOTAL AMOUNT*/}
        <Text>
          T. A. = <Text>A9{item.total_amount}5T</Text>
        </Text>

        {/*  */}
        <Text
          style={{
            borderWidth: 1,
            padding: 5,
            margin: 10,
            alignSelf: 'center',
          }}>
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View style={{flex: 1, backgroundColor: 'green'}}>
          <FlatList
            data={stock}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  stock: state.stock.reverse(),
});

const mapDispatchToProps = (dispatch) => ({
  setStock: (stk) => dispatch(addItem(stk)),
  setResetState: () => dispatch(resetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockDetail);
