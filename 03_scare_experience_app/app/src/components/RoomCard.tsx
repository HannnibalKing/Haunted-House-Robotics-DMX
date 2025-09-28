import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RoomFeedback } from '../data/experienceData';
import { ScoreBadge } from './ScoreBadge';

export type RoomCardProps = {
  room: RoomFeedback;
  onPress?: (room: RoomFeedback) => void;
};

const intensityColors: Record<RoomFeedback['intensity'], string> = {
  mild: '#6fc2b1',
  moderate: '#f1b24a',
  extreme: '#ff5f5f'
};

export const RoomCard: React.FC<RoomCardProps> = ({ room, onPress }: RoomCardProps) => {
  const Container: React.ComponentType<any> = onPress ? Pressable : View;

  return (
    <Container
      style={[styles.card, { borderLeftColor: intensityColors[room.intensity] }]}
      onPress={onPress ? () => onPress(room) : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{room.name}</Text>
        <ScoreBadge score={room.scareScore} />
      </View>
      <Text style={styles.subtitle}>Primary vibes: {room.adjectives.join(', ')}</Text>
      <Text style={styles.comment} numberOfLines={2}>
        “{room.recentComments[0]?.note ?? 'Be the first to leave feedback!'}”
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16161a',
    borderRadius: 12,
    borderLeftWidth: 6,
    marginBottom: 16,
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: '#f6f7fb',
    fontSize: 18,
    fontWeight: '600'
  },
  subtitle: {
    marginTop: 8,
    color: '#a0a5bd'
  },
  comment: {
    marginTop: 12,
    color: '#d2d6e9',
    fontStyle: 'italic'
  }
});
