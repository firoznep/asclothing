import React from 'react';
import {View, Text} from 'react-native';

// navigations
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// screens
import AddStock from './AddStock';
import UpdateStock from './UpdateStock';
import StocksDetail from './StocksDetail';
import DeleteStock from './DeleteStock';

const Tab = createBottomTabNavigator();

const StockManage = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="StocksDetail" component={StocksDetail} />
      <Tab.Screen name="AddStock" component={AddStock} />
      <Tab.Screen name="DeleteStock" component={DeleteStock} />
      <Tab.Screen name="UpdateStock" component={UpdateStock} />
    </Tab.Navigator>
  );
};

export default StockManage;
