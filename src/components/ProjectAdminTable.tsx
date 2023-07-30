/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Card} from 'react-native-paper';
import AppHeader from '../elements/AppHeader';
import {useSelector, useDispatch} from 'react-redux';
import {selectNotifications, selectProjects} from '../store/selectors';
import {AppDispatch} from '../store/store';
import {fetchNotificationsAsync, fetchProjectsAsync} from '../store/thunks';
import ProjectItem from '../elements/ProjectItem';
import Notifications from '../elements/NotificationItem';
import HamburguerElements from '../elements/HamburguerElements';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorParams} from '../navigation/AppNavigator';
import ProjectCreateModal from '../elements/ProjectCreateModal';

const ProjectAdminTable = () => {
  const projects = useSelector(selectProjects);
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<StackNavigationProp<StackNavigatorParams, 'Projects'>>();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchProjectsAsync());
  }, [dispatch]);

  const handleBellPress = () => {
    dispatch(fetchNotificationsAsync());
    setShowNotifications(true);
  };

  const handleMenuPress = () => {
    setShowMenu(!showMenu);
  };

  const handleClose = () => {
    if (showNotifications) {
      setShowNotifications(false);
    }
    if (showMenu) {
      setShowMenu(false);
    }
  };

  const navigateToScreenProject = (screen: keyof StackNavigatorParams) => {
    navigation.navigate(screen);
    setShowMenu(false);
  };

  const handleOpenModal = () => {
    console.log('Opening modal...');
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <AppHeader
          onBellPress={handleBellPress}
          onMenuPress={handleMenuPress}
        />
        <Button
          mode="contained"
          onPress={handleOpenModal}
          style={styles.registerButton}>
          {' '}
          Registrar Proyecto{' '}
        </Button>
        <Card style={styles.projectCard}>
          <Card.Title title="Proyectos" />
          <Card.Content>
            <ScrollView horizontal>
              <View>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.headerCell]}>Id</Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    Project Name
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    Repo Url
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    Client
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    Developers
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>ci</Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>cd</Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    Frontend Technology
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    Backend Technology
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    Databases
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    Erros Count
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    Warning Count
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    Deploy Count
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    Percentage Completion
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    Report nc
                  </Text>
                  <Text style={[styles.tableCell, styles.headerCell]}>
                    Status
                  </Text>
                </View>
                {projects?.map((project, index) => (
                  <ProjectItem key={index} project={project} />
                ))}
              </View>
            </ScrollView>
          </Card.Content>
        </Card>
      </ScrollView>
      {showNotifications && (
        <TouchableOpacity
          onPress={handleClose}
          activeOpacity={1}
          style={styles.touchableContainer}>
          <Notifications notifications={notifications} />
        </TouchableOpacity>
      )}
      {showMenu && (
        <TouchableOpacity
          onPress={handleClose}
          activeOpacity={1}
          style={styles.touchableContainer}>
          <HamburguerElements onNavigate={navigateToScreenProject} />
        </TouchableOpacity>
      )}
      <ProjectCreateModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableContainer: {
    flex: 1,
  },
  registerButton: {
    margin: 15,
  },
  projectCard: {
    margin: 15,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    minWidth: 1300,
  },
  headerCell: {
    fontWeight: 'bold',
  },
});

export default ProjectAdminTable;
