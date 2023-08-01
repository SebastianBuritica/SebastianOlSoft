import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {CommitReport} from '../store/types';

interface CommitsReportCardProps {
  report: CommitReport[] | null;
}

const CommitsReportCard: React.FC<CommitsReportCardProps> = ({report}) => {
  if (!report) return null;

  const data = {
    labels: report.map(item => `Month ${item.month}`),
    datasets: [
      {
        data: report.map(item => item.feat),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Commits Report</Text>
      <Text style={styles.subtext}>
        {' '}
        Information about the commits over time{' '}
      </Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={320}
          height={220}
          yAxisLabel={''}
          yAxisSuffix={''}
          chartConfig={{
            backgroundColor: '#f2f2f2',
            backgroundGradientFrom: '#f2f2f2',
            backgroundGradientTo: '#f2f2f2',
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 12,
  },
  chartContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
});

export default CommitsReportCard;
