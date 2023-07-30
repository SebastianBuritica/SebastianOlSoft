/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  selectCommitsReport,
  selectCpuReport,
  selectDashboardCards,
  selectNotifications,
} from '../store/selectors';
import {
  fetchCommitsReportAsync,
  fetchCpuReportAsync,
  fetchDashboardCardsAsync,
  fetchNotificationsAsync,
} from '../store/thunks';
import {AppDispatch} from '../store/store';
import Notifications from '../elements/NotificationItem';
import HamburguerElements from '../elements/HamburguerElements';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorParams} from '../navigation/AppNavigator';
import DashboardTable from '../elements/DashboardTable';
import ServerDetailsCard from '../elements/ServerDetailsCard';
import CommitsReportCard from '../elements/CommitsReportCard';
import AppHeader from '../elements/AppHeader';

const Dashboard = () => {
  const notifications = useSelector(selectNotifications);
  const dashboardCards = useSelector(selectDashboardCards);
  const cpuReport = useSelector(selectCpuReport);
  const commitsReport = useSelector(selectCommitsReport);
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<StackNavigationProp<StackNavigatorParams, 'Dashboard'>>();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboardCardsAsync());
    dispatch(fetchCpuReportAsync());
    dispatch(fetchCommitsReportAsync());
  }, [dispatch]);

  const handleNotificationsPress = () => {
    dispatch(fetchNotificationsAsync());
    setShowNotifications(true);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  const handleMenuPress = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleClose = () => {
    if (showNotifications) {
      closeNotifications();
    }
    if (showMenu) {
      closeMenu();
    }
  };

  const navigateToScreen = (screen: keyof StackNavigatorParams) => {
    navigation.navigate(screen);
    setShowMenu(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          onPress={handleClose}
          activeOpacity={1}
          style={styles.touchableContainer}>
          <AppHeader
            onBellPress={handleNotificationsPress}
            onMenuPress={handleMenuPress}
          />
          <DashboardTable cards={dashboardCards} />
          <ServerDetailsCard report={cpuReport} />
          <CommitsReportCard report={commitsReport} />
        </TouchableOpacity>
      </ScrollView>
      {showNotifications && <Notifications notifications={notifications} />}
      {showMenu && <HamburguerElements onNavigate={navigateToScreen} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
  touchableContainer: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  menuIcon: {
    marginLeft: 15,
  },
});

export default Dashboard;
