import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';

import {connect} from 'react-redux';

import CustomBtn from '../components/CustomBtn';
import CustomInput from '../components/CustomInput';
import {ScrollView} from 'react-native-gesture-handler';

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
      total += output[i].item_quantity;
    }

    return setTotalItems(total);
  };

  return (
    <ScrollView style={{flex: 1}}>
      <CustomInput
        placeholder="Enter item Name"
        onChangeText={(name) => setInputText(name)}
        style={{padding: 10}}
      />

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
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  stock: state.stock,
});

export default connect(mapStateToProps)(ItemName);
