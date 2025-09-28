import React, { useMemo, useState } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useExperience } from '../context/ExperienceContext';
import { RoomFeedback } from '../data/experienceData';
import { RootStackParamList } from './DashboardScreen';
import { useFloorplan } from '../hooks/useFloorplan';

export type RoomDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'RoomDetail'>;

export function RoomDetailScreen({ route }: RoomDetailScreenProps): React.ReactElement {
  const { roomId, attractionId } = route.params;
  const { getRoomById, submitRating } = useExperience();
  const room = getRoomById(roomId);
  const floorplan = useFloorplan(attractionId);

  const [score, setScore] = useState('8');
  const [note, setNote] = useState('Incredible lighting crescendo!');

  const averageRecent = useMemo(() => {
    if (!room) {
      return 0;
    }
    return (
      room.recentComments.reduce((acc: number, comment: RoomFeedback['recentComments'][number]) => acc + comment.score, 0) /
      Math.max(room.recentComments.length, 1)
    ).toFixed(1);
  }, [room]);

  if (!room) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorState}>
          <Text style={styles.errorText}>Room not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSubmit = () => {
    const numericScore = Number(score);
    if (Number.isNaN(numericScore) || numericScore < 0 || numericScore > 10) {
      Alert.alert('Invalid Score', 'Please enter a value between 0 and 10.');
      return;
    }
    submitRating(room.id, numericScore, note);
    Alert.alert('Feedback captured', 'Thanks for contributing to the scare analytics!');
    setScore('7');
    setNote('Loved the actor timing!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{room.name}</Text>
        <Text style={styles.subtitle}>Average recent score: {averageRecent}</Text>
        <Text style={styles.intensity}>Intensity: {room.intensity.toUpperCase()}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Feedback</Text>
          {room.recentComments.map((comment: RoomFeedback['recentComments'][number]) => (
            <View key={comment.id} style={styles.commentCard}>
              <Text style={styles.commentAuthor}>{comment.author}</Text>
              <Text style={styles.commentNote}>{comment.note}</Text>
              <Text style={styles.commentScore}>Score: {comment.score}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Your Rating</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={score}
            onChangeText={setScore}
            placeholder="Score 0-10"
            placeholderTextColor="#5e6378"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            value={note}
            onChangeText={setNote}
            placeholder="What made this room memorable?"
            placeholderTextColor="#5e6378"
          />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Feedback</Text>
          </Pressable>
        </View>

        {floorplan && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI Layout Suggestion</Text>
            <Text style={styles.summary}>{floorplan.summary}</Text>
            <View style={styles.mapContainer}>
              {floorplan.asciiMap.split('\n').map((line: string, index: number) => (
                <Text key={index} style={styles.mapLine}>
                  {line}
                </Text>
              ))}
            </View>
            <Text style={styles.heat}>Heat signature: {floorplan.heatSignature}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f10'
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80
  },
  title: {
    color: '#f6f7fb',
    fontSize: 26,
    fontWeight: '700'
  },
  subtitle: {
    color: '#a0a5bd',
    marginTop: 6
  },
  intensity: {
    color: '#f1b24a',
    marginTop: 4,
    marginBottom: 16
  },
  section: {
    marginTop: 24
  },
  sectionTitle: {
    color: '#f6f7fb',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12
  },
  commentCard: {
    backgroundColor: '#15151c',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10
  },
  commentAuthor: {
    color: '#f1b24a',
    fontWeight: '600'
  },
  commentNote: {
    color: '#d2d6e9',
    marginTop: 6
  },
  commentScore: {
    color: '#a0a5bd',
    marginTop: 6,
    fontSize: 12
  },
  input: {
    backgroundColor: '#15151c',
    color: '#f6f7fb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#ff5f5f',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center'
  },
  buttonText: {
    color: '#0f0f10',
    fontWeight: '700'
  },
  summary: {
    color: '#d2d6e9',
    marginBottom: 12
  },
  mapContainer: {
    backgroundColor: '#15151c',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },
  mapLine: {
    fontFamily: 'Courier',
    color: '#f6f7fb'
  },
  heat: {
    color: '#a0a5bd'
  },
  errorState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorText: {
    color: '#ff5f5f',
    fontSize: 18
  }
});
