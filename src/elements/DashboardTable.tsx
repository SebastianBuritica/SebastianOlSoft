import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface DashboardTableProps {
  cards: {
    projects: number;
    projectsDev: number;
    pendingNc: number;
    errorsDeploy: number;
  } | null;
}

const DashboardTable: React.FC<DashboardTableProps> = ({cards}) => {
  if (!cards) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {Object.keys(cards).map((key, index) => (
          <Text key={index} style={styles.header}>
            {key}
          </Text>
        ))}
      </View>
      <View style={styles.row}>
        <Text style={styles.value}>{cards.projects}</Text>
        <Text style={styles.value}>{cards.projectsDev}</Text>
        <Text style={styles.value}>{cards.pendingNc}</Text>
        <Text style={styles.value}>{cards.errorsDeploy}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    textAlign: 'center',
  },
});

export default DashboardTable;
