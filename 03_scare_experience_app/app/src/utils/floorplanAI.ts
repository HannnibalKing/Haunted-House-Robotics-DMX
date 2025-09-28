import { Attraction, RoomFeedback } from '../data/experienceData';

type FloorplanNode = {
  id: string;
  label: string;
  intensity: RoomFeedback['intensity'];
  score: number;
  position: { x: number; y: number };
};

export type FloorplanSuggestion = {
  attractionId: string;
  attractionName: string;
  heatSignature: number;
  summary: string;
  asciiMap: string;
  nodes: FloorplanNode[];
};

const gridSize = 7;

const intensityWeights: Record<RoomFeedback['intensity'], number> = {
  mild: 0.6,
  moderate: 1,
  extreme: 1.4
};

function normalizeScore(score: number): number {
  return Math.min(Math.max(score / 10, 0.1), 1);
}

function createAsciiMap(nodes: FloorplanNode[]): string {
  const grid: string[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(' . '));

  nodes.forEach((node, index) => {
    const marker = index === 0 ? 'S' : String.fromCharCode(65 + index - 1);
    grid[node.position.y][node.position.x] = ` ${marker} `;
  });

  const horizontalDivider = '+---'.repeat(gridSize) + '+\n';
  return grid
    .map((row) => `${horizontalDivider}|${row.join('|')}|`)
    .join('\n')
    .concat(`\n${horizontalDivider}`);
}

function distributeNodes(rooms: RoomFeedback[]): FloorplanNode[] {
  const center = Math.floor(gridSize / 2);
  const radius = center;

  return rooms.map((room, index) => {
    const angle = (index / rooms.length) * Math.PI * 2;
    const distance = radius * normalizeScore(room.scareScore);
    const x = Math.min(Math.max(center + Math.round(Math.cos(angle) * distance), 0), gridSize - 1);
    const y = Math.min(Math.max(center + Math.round(Math.sin(angle) * distance), 0), gridSize - 1);

    return {
      id: room.id,
      label: room.name,
      intensity: room.intensity,
      score: room.scareScore,
      position: { x, y }
    };
  });
}

export function generateFloorplan(attraction: Attraction): FloorplanSuggestion {
  const nodes = distributeNodes(attraction.rooms);

  const heatSignature = parseFloat(
    (
      attraction.rooms.reduce((acc, room) => acc + room.scareScore * intensityWeights[room.intensity], 0) /
      attraction.rooms.length /
      10
    ).toFixed(2)
  );

  const hottestRoom = attraction.rooms.reduce((prev, curr) => (curr.scareScore > prev.scareScore ? curr : prev));

  const summary = `High energy near ${hottestRoom.name}. Consider adding transition space before "${hottestRoom.name}" to prevent overwhelm.`;

  return {
    attractionId: attraction.id,
    attractionName: attraction.name,
    heatSignature,
    summary,
    asciiMap: createAsciiMap(nodes),
    nodes
  };
}
