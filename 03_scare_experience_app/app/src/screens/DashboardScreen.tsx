import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useExperience } from '../context/ExperienceContext';
import { RoomCard } from '../components/RoomCard';
import { HeatmapLegend } from '../components/HeatmapLegend';
import { ScoreBadge } from '../components/ScoreBadge';
import { Attraction, RoomFeedback } from '../data/experienceData';

export type RootStackParamList = {
  Dashboard: undefined;
  RoomDetail: { roomId: string; attractionId: string };
};

export type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: DashboardScreenProps): React.ReactElement {
  const { attractions } = useExperience();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.listContent}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Experience Pulse</Text>
          <Text style={styles.subtitle}>Live ratings across tonight's attractions</Text>
          <HeatmapLegend />
        </View>

  {attractions.map((attraction: Attraction) => (
          <View key={attraction.id} style={styles.attractionCard}>
            <View style={styles.attractionHeader}>
              <View>
                <Text style={styles.attractionTitle}>{attraction.name}</Text>
                <Text style={styles.attractionTheme}>{attraction.theme}</Text>
              </View>
              <ScoreBadge score={attraction.averageScore} />
            </View>

            {attraction.rooms.map((room: RoomFeedback) => (
              <RoomCard
                key={room.id}
                room={room}
                onPress={() => navigation.navigate('RoomDetail', { roomId: room.id, attractionId: attraction.id })}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f10'
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 32
  },
  title: {
    color: '#f6f7fb',
    fontSize: 28,
    fontWeight: '700'
  },
  subtitle: {
    color: '#a0a5bd',
    marginTop: 8,
    marginBottom: 24
  },
  listContent: {
    paddingBottom: 48
  },
  attractionCard: {
    backgroundColor: '#15151c',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20
  },
  attractionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  attractionTitle: {
    color: '#f6f7fb',
    fontSize: 20,
    fontWeight: '600'
  },
  attractionTheme: {
    color: '#a0a5bd',
    marginTop: 4
  }
});
