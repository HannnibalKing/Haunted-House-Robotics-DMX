import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function HeatmapLegend(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scare Heatmap</Text>
      <View style={styles.row}>
        <View style={[styles.swatch, { backgroundColor: '#6fc2b1' }]} />
        <Text style={styles.label}>Chill</Text>
        <View style={[styles.swatch, { backgroundColor: '#f1b24a' }]} />
        <Text style={styles.label}>Intense</Text>
        <View style={[styles.swatch, { backgroundColor: '#ff5f5f' }]} />
        <Text style={styles.label}>Terrifying</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131318',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16
  },
  title: {
    color: '#f6f7fb',
    fontWeight: '600',
    marginBottom: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  swatch: {
    width: 24,
    height: 12,
    borderRadius: 4
  },
  label: {
    color: '#a0a5bd',
    fontSize: 12
  }
});
