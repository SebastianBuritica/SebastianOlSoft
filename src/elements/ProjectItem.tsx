import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Divider} from 'react-native-paper';
import {Project} from '../store/types';

const ProjectItem: React.FC<{project: Project}> = ({project}) => {
  return (
    <View>
      <ScrollView horizontal>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{project.id}</Text>
          <Text style={styles.tableCell}>{project.projectName}</Text>
          <Text style={styles.tableCell}>{project.repoUrl}</Text>
          <Text style={styles.tableCell}>{project.client}</Text>
          <Text style={styles.tableCell}>{project.developers}</Text>
          <Text style={styles.tableCell}>{project.ci ? 'true' : 'false'}</Text>
          <Text style={styles.tableCell}>{project.cd ? 'true' : 'false'}</Text>
          <Text style={styles.tableCell}>{project.frontendTecnology}</Text>
          <Text style={styles.tableCell}>{project.backendTecnology}</Text>
          <Text style={styles.tableCell}>{project.databases}</Text>
          <Text style={styles.tableCell}>{project.errorsCount}</Text>
          <Text style={styles.tableCell}>{project.warningCount}</Text>
          <Text style={styles.tableCell}>{project.deployCount}</Text>
          <Text style={styles.tableCell}>{project.percentageCompletion}</Text>
          <Text style={styles.tableCell}>{project.reportNc}</Text>
          <Text style={styles.tableCell}>{project.status}</Text>
        </View>
      </ScrollView>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  tableRow: {flexDirection: 'row'},
  tableCell: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    minWidth: 1300,
  },
});

export default ProjectItem;
