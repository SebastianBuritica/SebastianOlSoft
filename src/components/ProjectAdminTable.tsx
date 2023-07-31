/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Button, Card} from 'react-native-paper';
import AppHeader from '../elements/AppHeader';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectNotifications,
  selectProjects,
  selectProjectsStatus,
} from '../store/selectors';
import {AppDispatch} from '../store/store';
import {
  deleteProjectAsync,
  fetchNotificationsAsync,
  fetchProjectsAsync,
  updateProjectAsync,
} from '../store/thunks';
import ProjectItem from '../elements/ProjectItem';
import Notifications from '../elements/NotificationItem';
import HamburguerElements from '../elements/HamburguerElements';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorParams} from '../navigation/AppNavigator';
import ProjectCreateModal from '../elements/ProjectCreateModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Project} from '../store/types';

const ProjectAdminTable = () => {
  const projects = useSelector(selectProjects);
  const projectsStatus = useSelector(selectProjectsStatus);
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<StackNavigationProp<StackNavigatorParams, 'Projects'>>();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const handleDeleteProject = (id: number) => {
    dispatch(deleteProjectAsync(id));
  };

  const navigateToScreenProject = (screen: keyof StackNavigatorParams) => {
    navigation.navigate(screen);
    setShowMenu(false);
  };

  const handleOpenModal = () => {
    console.log('Opening modal...');
    setModalVisible(true);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {projectsStatus === 'loading' ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
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
                    {projects && projects[0] ? (
                      Object.keys(projects[0]).map((key, index) => (
                        <Text
                          key={index}
                          style={[styles.tableCell, styles.headerCell]}>
                          {key}
                        </Text>
                      ))
                    ) : (
                      <Text>No Headers Available</Text>
                    )}
                  </View>
                  {projects?.map((project, index) => (
                    <ProjectItem
                      key={index}
                      project={project}
                      onDelete={handleDeleteProject}
                      onSelect={() => handleSelectProject(project)}
                    />
                  ))}
                </View>
              </ScrollView>
            </Card.Content>
          </Card>
        </ScrollView>
      )}
      <ProjectCreateModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedProject(null);
        }}
        editingProject={selectedProject}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProjectAdminTable;
