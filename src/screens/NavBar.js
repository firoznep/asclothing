import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './Dashboard';
import ItemName from './ItemName';

const Stack = createStackNavigator();

const NavBar = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="ItemName" component={ItemName} />
    </Stack.Navigator>
  );
};

export default NavBar;
