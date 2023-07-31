import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {Project} from '../store/types';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  project: Project;
  onDelete: (id: number) => void;
  onSelect: () => void;
};

const ProjectItem: React.FC<Props> = ({project, onDelete, onSelect}) => {
  return (
    <View>
      <ScrollView horizontal>
        <View style={styles.tableRow}>
          <TouchableOpacity onPress={() => onDelete(project.id)}>
            <Icon name="minus-circle" size={20} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>{project.id}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>{project.projectName}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>{project.repoUrl}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>{project.client}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>{project.developers}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>
              {project.ci ? 'true' : 'false'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>
              {project.cd ? 'true' : 'false'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>{project.frontendTecnology}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>{project.backendTecnology}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>{project.databases}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>{project.errorsCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>{project.warningCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>{project.deployCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>{project.percentageCompletion}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>{project.reportNc}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelect}>
            <Text style={styles.tableCell}>{project.status}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  tableRow: {flexDirection: 'row', alignItems: 'center'},
  tableCell: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    minWidth: 1300,
  },
});

export default ProjectItem;
