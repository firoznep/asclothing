import React from 'react';

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
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          paddingBottom: 12,
        },
        activeBackgroundColor: '#00796B',
      }}>
      <Tab.Screen name="StocksDetail" component={StocksDetail} />
      <Tab.Screen name="AddStock" component={AddStock} />
      <Tab.Screen name="DeleteStock" component={DeleteStock} />
      <Tab.Screen name="UpdateStock" component={UpdateStock} />
    </Tab.Navigator>
  );
};

export default StockManage;
