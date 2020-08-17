import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './Dashboard';
import ItemName from './ItemName';
import SearchItemsPage from './SearchItemsPage';

const Stack = createStackNavigator();

const NavBar = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          // title: 'Home',
          headerStyle: {backgroundColor: '#0288D1'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <Stack.Screen name="ItemName" component={ItemName} />
      <Stack.Screen name="SearchItemsPage" component={SearchItemsPage} />
    </Stack.Navigator>
  );
};

export default NavBar;
