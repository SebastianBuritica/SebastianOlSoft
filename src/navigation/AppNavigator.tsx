import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../components/Dashboard';
import LoginForm from '../components/LoginForm';
import ProjectAdminTable from '../components/ProjectAdminTable';
import UserAdminTable from '../components/UserAdminTable';

export type StackNavigatorParams = {
  Login: undefined;
  Dashboard: undefined;
  Projects: undefined;
  Users: undefined;
};

const Stack = createStackNavigator<StackNavigatorParams>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="Projects"
          component={ProjectAdminTable}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="Users"
          component={UserAdminTable}
          options={{title: '', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
