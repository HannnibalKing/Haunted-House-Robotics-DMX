import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ScoreBadgeProps = {
  score: number;
};

export function ScoreBadge({ score }: ScoreBadgeProps): React.ReactElement {
  const normalized = Math.min(Math.max(score, 0), 10);
  const bgColor = normalized >= 8 ? '#ff5f5f' : normalized >= 6 ? '#f1b24a' : '#6fc2b1';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>  
      <Text style={styles.text}>{normalized.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#0f0f10',
    fontWeight: '700'
  }
});
