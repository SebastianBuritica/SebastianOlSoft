import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

interface AppHeaderProps {
  onBellPress: () => void;
  onMenuPress: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({onBellPress, onMenuPress}) => {
  return (
    <Header
      placement="left"
      containerStyle={{backgroundColor: 'transparent'}}
      rightComponent={
        <View style={styles.iconsContainer}>
          <Icon name="bell" size={25} color="black" onPress={onBellPress} />
          <Icon
            name="bars"
            size={25}
            color="black"
            onPress={onMenuPress}
            style={styles.menuIcon}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
  },
  menuIcon: {
    marginLeft: 15,
  },
});

export default AppHeader;
