import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackNavigatorParams} from '../navigation/AppNavigator';

type MenuDropdownProps = {
  onNavigate: (screen: keyof StackNavigatorParams) => void;
};

const HamburguerElements: React.FC<MenuDropdownProps> = ({onNavigate}) => {
  const menuItems: {
    name: string;
    icon: string;
    screen: keyof StackNavigatorParams;
  }[] = [
    {name: 'Dashboard', icon: 'dashboard', screen: 'Dashboard'},
    {name: 'Lista de proyectos', icon: 'list', screen: 'Projects'},
    {name: 'Lista de usuarios', icon: 'user', screen: 'Users'},
  ];

  return (
    <View style={styles.menuContainer}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => {
            onNavigate(item.screen);
          }}>
          <Icon name={item.icon} size={20} color="black" />
          <Text style={styles.menuText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    width: 250,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  menuText: {
    marginLeft: 10,
  },
});

export default HamburguerElements;
