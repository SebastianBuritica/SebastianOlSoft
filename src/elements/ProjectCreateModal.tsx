import React, {useState, useEffect} from 'react';
import {
  TextInput,
  Button,
  Card,
  RadioButton,
  Text,
  Modal,
} from 'react-native-paper';
import {ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../store/store';
import {selectProjects} from '../store/selectors';
import {createProjectAsync, updateProjectAsync} from '../store/thunks';
import {Project} from '../store/types';

type ProjectCreateModalProps = {
  visible: boolean;
  onClose: () => void;
  editingProject?: Project | null;
};

const ProjectCreateModal = ({
  visible,
  onClose,
  editingProject,
}: ProjectCreateModalProps) => {
  console.log('Modal visible:', visible);
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector(selectProjects);
  const [data, setData] = useState({
    id: 0,
    projectName: '',
    repoUrl: '',
    client: '',
    developers: '',
    ci: false,
    cd: true,
    frontendTecnology: '',
    backendTecnology: '',
    databases: '',
    errorsCount: 0,
    warningCount: 0,
    deployCount: 0,
    percentageCompletion: 0,
    reportNc: 0,
    status: '',
  });

  const handleSaveProject = () => {
    if (editingProject) {
      dispatch(updateProjectAsync({id: editingProject.id, project: data}));
    } else {
      dispatch(createProjectAsync(data));
    }
    onClose();
  };

  useEffect(() => {
    if (editingProject) {
      setData(editingProject);
    } else {
      // Reset to initial state if creating a new project
      setData({
        id: 0,
        projectName: '',
        repoUrl: '',
        client: '',
        developers: '',
        ci: false,
        cd: true,
        frontendTecnology: '',
        backendTecnology: '',
        databases: '',
        errorsCount: 0,
        warningCount: 0,
        deployCount: 0,
        percentageCompletion: 0,
        reportNc: 0,
        status: '',
      });
    }
  }, [editingProject]);

  useEffect(() => {
    if (projects !== null) {
      const newId =
        projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;

      setData(prevData => ({...prevData, id: newId}));
    }
  }, [projects]);

  const handleChange = (field: string, value: string) => {
    if (
      [
        'errorsCount',
        'warningCount',
        'deployCount',
        'percentageCompletion',
        'reportNc',
      ].includes(field)
    ) {
      setData({...data, [field]: Number(value)});
    } else {
      setData({...data, [field]: value});
    }
  };

  const handleRadioChange = (field: string, value: boolean) => {
    setData({...data, [field]: value});
  };

  return (
    <Modal visible={visible} onDismiss={onClose}>
      <Card style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Card.Title title="Create Project" />
          <Card.Content>
            <TextInput
              label="Project Name"
              value={data.projectName}
              style={styles.inputMargin}
              onChangeText={value => handleChange('projectName', value)}
            />
            <TextInput
              label="Repo URL"
              value={data.repoUrl}
              style={styles.inputMargin}
              onChangeText={value => handleChange('repoUrl', value)}
            />
            <TextInput
              label="Client"
              value={data.client}
              style={styles.inputMargin}
              onChangeText={value => handleChange('client', value)}
            />
            <TextInput
              label="Developers"
              value={data.developers}
              style={styles.inputMargin}
              onChangeText={value => handleChange('developers', value)}
            />
            <TextInput
              label="Frontend Technology"
              value={data.frontendTecnology}
              style={styles.inputMargin}
              onChangeText={value => handleChange('frontendTecnology', value)}
            />
            <TextInput
              label="Backend Technology"
              value={data.backendTecnology}
              style={styles.inputMargin}
              onChangeText={value => handleChange('backendTecnology', value)}
            />
            <TextInput
              label="Databases"
              value={data.databases}
              style={styles.inputMargin}
              onChangeText={value => handleChange('databases', value)}
            />
            <TextInput
              label="Errors Count"
              value={data.errorsCount.toString()}
              style={styles.inputMargin}
              onChangeText={value => handleChange('errorsCount', value)}
            />
            <TextInput
              label="Warning Count"
              value={data.warningCount.toString()}
              style={styles.inputMargin}
              onChangeText={value => handleChange('warningCount', value)}
            />
            <TextInput
              label="Deploy Count"
              value={data.deployCount.toString()}
              style={styles.inputMargin}
              onChangeText={value => handleChange('deployCount', value)}
            />
            <TextInput
              label="Percentage Completion"
              value={data.percentageCompletion.toString()}
              style={styles.inputMargin}
              onChangeText={value =>
                handleChange('percentageCompletion', value)
              }
            />
            <TextInput
              label="Report NC"
              value={data.reportNc.toString()}
              style={styles.inputMargin}
              onChangeText={value => handleChange('reportNc', value)}
            />
            <TextInput
              label="Status"
              value={data.status}
              style={styles.inputMargin}
              onChangeText={value => handleChange('status', value)}
            />
            <Text>Continuous Integration (CI)</Text>
            <RadioButton.Group
              onValueChange={value => handleRadioChange('ci', value === 'yes')}
              value={data.ci ? 'yes' : 'no'}>
              <RadioButton.Item label="Yes" value="yes" />
              <RadioButton.Item label="No" value="no" />
            </RadioButton.Group>

            <Text>Continuous Deployment (CD)</Text>
            <RadioButton.Group
              onValueChange={value => handleRadioChange('cd', value === 'yes')}
              value={data.cd ? 'yes' : 'no'}>
              <RadioButton.Item label="Yes" value="yes" />
              <RadioButton.Item label="No" value="no" />
            </RadioButton.Group>
            <Button
              mode="contained"
              style={styles.buttonMargin}
              onPress={handleSaveProject}>
              {editingProject ? 'Update Project' : 'Create Project'}
            </Button>
          </Card.Content>
        </ScrollView>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 50,
  },
  buttonMargin: {
    marginTop: 10,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  inputMargin: {
    marginBottom: 10,
  },
});

export default ProjectCreateModal;
