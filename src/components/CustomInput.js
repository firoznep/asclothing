import React from 'react';
import {View, TextInput} from 'react-native';

const CustomInput = (props) => {
  return (
    <View
      style={{
        marginHorizontal: 15,
        marginTop: 10,
        borderColor: '#689F38',
        borderWidth: 1,
      }}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholderTextColor="#A1887F"
        blurOnSubmit={false}
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
};

export default CustomInput;
