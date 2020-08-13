import 'react-native-gesture-handler';

import React from 'react';

// navigations
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

// screens
import StockManage from './src/stocks/StockManage';
import NavBar from './src/screens/NavBar';

const drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <drawer.Navigator initialRouteName="NavBar">
        <drawer.Screen name="Dashboard" component={NavBar} />
        <drawer.Screen name="StockManage" component={StockManage} />
      </drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
