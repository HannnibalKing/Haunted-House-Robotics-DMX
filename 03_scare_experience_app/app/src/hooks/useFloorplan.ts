import { useMemo } from 'react';
import { useExperience } from '../context/ExperienceContext';
import { generateFloorplan } from '../utils/floorplanAI';

export const useFloorplan = (attractionId: string) => {
  const { attractions } = useExperience();

  return useMemo(() => {
  const attraction = attractions.find((item: typeof attractions[number]) => item.id === attractionId);
    if (!attraction) {
      return undefined;
    }
    return generateFloorplan(attraction);
  }, [attractions, attractionId]);
};
