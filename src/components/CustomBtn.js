import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomBtn = (props) => {
  return (
    <TouchableOpacity style={style.btnStyle} onPress={props.onBtnPress}>
      <Text style={style.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
    backgroundColor: '#f00000',
    color: '#ffffff',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  text: {
    color: '#fff',
  },
});
export default CustomBtn;
