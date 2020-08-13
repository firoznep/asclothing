import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, RefreshControl, FlatList} from 'react-native';
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

  let listViewItemSeparator = () => {
    return (
      <View style={{height: 2, width: '100%', backgroundColor: '#0288D1'}} />
    );
  };

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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Item Id = {item.item_id}</Text>
          <Text style={{borderWidth: 1, padding: 2}}>{item.date}</Text>
        </View>
        <Text>
          Item Name ={' '}
          <Text style={{color: '#E91E63', fontWeight: 'bold'}}>
            {item.item_name}
          </Text>
        </Text>
        <Text>
          Item Quantity ={' '}
          <Text style={{fontSize: 20, color: '#C2185B', fontWeight: 'bold'}}>
            {item.item_quantity}
          </Text>
        </Text>
        <Text style={{borderWidth: 1, padding: 5, margin: 10}}>
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
        <View style={{flex: 1}}>
          <FlatList
            data={stock}
            // ItemSeparatorComponent={listViewItemSeparator}
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
  stock: state.stock,
});

const mapDispatchToProps = (dispatch) => ({
  setStock: (stk) => dispatch(addItem(stk)),
  setResetState: () => dispatch(resetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockDetail);
