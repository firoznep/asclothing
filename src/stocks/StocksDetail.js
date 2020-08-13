import React, {useEffect} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';

import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import CustomBtn from '../components/CustomBtn';

const StockDetail = ({stock, navigation}) => {
  let listViewItemSeparator = () => {
    return (
      <View style={{height: 2, width: '100%', backgroundColor: '#f00000'}} />
    );
  };

  let listItemView = (item) => {
    return (
      <View key={item.item_id} style={{backgroundColor: 'white', padding: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Item Id: {item.item_id}</Text>
          <Text>{item.date}</Text>
        </View>
        <Text>Item Name: {item.item_name}</Text>
        <Text>
          Item Quantity ={' '}
          <Text style={{fontSize: 20, color: 'green', fontWeight: 'bold'}}>
            {item.item_quantity}
          </Text>{' '}
          avalable
        </Text>
        <Text>Description: {item.description}</Text>
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
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  stock: state.stock,
});

export default connect(mapStateToProps)(StockDetail);
