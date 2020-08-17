import React from 'react';
import {View, Text} from 'react-native';

import {Picker} from '@react-native-community/picker';

const SearchItemsPage = () => (
  <View>
    {/* SIZE PICKER*/}
    <View
      style={{
        marginHorizontal: 15,
        marginTop: 10,
        borderColor: '#689F38',
        borderWidth: 1,
      }}>
      <Picker
        selectedValue={'test'}
        style={{
          height: 50,
          // minWidth: '50%',
        }}
        onValueChange={(itemName) => {}}>
        <Picker.Item label="FREE-SIZE" value="FREE-SIZE" />
        <Picker.Item label="XXXL" value="XXXL" />
      </Picker>
    </View>
    <Text>Search Items Page</Text>
  </View>
);

export default SearchItemsPage;
