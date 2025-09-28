import { attractions } from '../src/data/experienceData';
import { generateFloorplan } from '../src/utils/floorplanAI';

describe('floorplanAI', () => {
  it('creates a deterministic layout for attraction rooms', () => {
    const suggestion = generateFloorplan(attractions[0]);

    expect(suggestion.attractionId).toBe(attractions[0].id);
    expect(suggestion.nodes).toHaveLength(attractions[0].rooms.length);
    expect(suggestion.asciiMap).toContain('S');
    expect(suggestion.summary.length).toBeGreaterThan(10);
  });
});
