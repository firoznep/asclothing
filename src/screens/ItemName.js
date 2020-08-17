import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  ActionSheetIOS,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

import CustomInput from '../components/CustomInput';

import {connect} from 'react-redux';

const ItemName = ({stock}) => {
  let [inputText, setInputText] = useState('');
  let [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    getTotalItemRate(inputText);
  });

  const getTotalItemRate = (name) => {
    let output = stock.filter((arr) => arr.item_name == name);
    let total = 0;

    for (let i = 0; i < output.length; i++) {
      total += output[i].quantity;
    }

    setTotalItems(total);

    return;
  };

  // FOR FLATLIST VIEW COMPONENT

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

  // FOR GETTING ITEM_NAME FROM STOCK AND PASSED TO PICKER
  let nameArr = stock.map((val) => val.item_name);
  let arrSet = new Set(nameArr);
  let uniqueArr = [...arrSet];

  return (
    <SafeAreaView style={{flex: 1}}>
      <Picker
        // style={{your_style}}
        mode="dropdown"
        selectedValue={inputText}
        onValueChange={(n) => {
          setInputText(n);
        }}>
        <Picker.Item label="Select name" value="" />
        {uniqueArr.map((elm) => {
          return <Picker.Item label={elm} value={elm} key={elm} />;
        })}
      </Picker>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 24}}>Total {inputText} = </Text>
        <Text style={{fontSize: 32, color: 'green'}}>{totalItems}</Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={stock.filter((arr) => arr.item_name == inputText)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => listItemView(item)}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  stock: state.stock,
});

export default connect(mapStateToProps)(ItemName);
