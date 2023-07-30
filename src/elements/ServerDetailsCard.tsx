import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {CpuReport} from '../store/types';

interface ServerDetailsCardProps {
  report: CpuReport | null;
}

const ServerDetailsCard: React.FC<ServerDetailsCardProps> = ({report}) => {
  if (!report) return null;

  const data = {
    labels: report.time.map(item => item.time),
    datasets: [
      {
        data: report.time.map(item => item.value),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detallers del Servidor</Text>
      <Text style={styles.subtext}>
        Información sobre el consumo y uso del servidor principal para
        desarrollo
      </Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={320}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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

export default ServerDetailsCard;
