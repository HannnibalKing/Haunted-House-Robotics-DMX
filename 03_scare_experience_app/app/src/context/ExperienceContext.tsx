import React, { createContext, useContext, useMemo, useState } from 'react';
import { attractions as seedAttractions, Attraction, RoomFeedback } from '../data/experienceData';

type ExperienceContextValue = {
  attractions: Attraction[];
  submitRating: (roomId: string, score: number, note: string, author?: string) => void;
  getRoomById: (roomId: string) => RoomFeedback | undefined;
};

const ExperienceContext = createContext<ExperienceContextValue | undefined>(undefined);

type ProviderProps = {
  children: React.ReactNode;
};

export const ExperienceProvider = ({ children }: ProviderProps): React.ReactElement => {
  const [data, setData] = useState<Attraction[]>(seedAttractions);

  const submitRating = (roomId: string, score: number, note: string, author = 'Guest') => {
    const timestamp = new Date().toISOString();
    setData((prev: Attraction[]) =>
      prev.map((attraction: Attraction) => ({
        ...attraction,
        rooms: attraction.rooms.map((room: RoomFeedback) => {
          if (room.id !== roomId) {
            return room;
          }

          const updatedComments = [
            {
              id: `comment-${Math.random().toString(36).substring(2, 7)}`,
              author,
              note,
              score,
              timestamp
            },
            ...room.recentComments
          ].slice(0, 6);

          const newScore = (room.scareScore * room.recentComments.length + score) / (room.recentComments.length + 1);

          return {
            ...room,
            scareScore: parseFloat(newScore.toFixed(1)),
            recentComments: updatedComments
          };
        })
      }))
    );
  };

  const getRoomById = (roomId: string) => {
    for (const attraction of data) {
  const hit = attraction.rooms.find((room: RoomFeedback) => room.id === roomId);
      if (hit) {
        return hit;
      }
    }
    return undefined;
  };

  const value = useMemo(() => ({ attractions: data, submitRating, getRoomById }), [data]);

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
};

export const useExperience = () => {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return ctx;
};
