export type RoomFeedback = {
  id: string;
  name: string;
  scareScore: number;
  intensity: 'mild' | 'moderate' | 'extreme';
  adjectives: string[];
  recentComments: { id: string; author: string; note: string; score: number; timestamp: string }[];
};

export type Attraction = {
  id: string;
  name: string;
  theme: string;
  averageScore: number;
  rooms: RoomFeedback[];
};

export const attractions: Attraction[] = [
  {
    id: 'hhr-01',
    name: 'Phantom Manor',
    theme: 'Victorian Séance',
    averageScore: 7.8,
    rooms: [
      {
        id: 'room-01',
        name: 'Candlelit Parlor',
        scareScore: 6.5,
        intensity: 'moderate',
        adjectives: ['creepy', 'suspenseful', 'eerie'],
        recentComments: [
          {
            id: 'comment-01',
            author: 'Kayla',
            note: 'Loved the floating candles and whispers.',
            score: 7,
            timestamp: '2025-09-25T21:15:00Z'
          },
          {
            id: 'comment-02',
            author: 'Jon',
            note: 'Great buildup but could be longer.',
            score: 6,
            timestamp: '2025-09-25T21:17:00Z'
          }
        ]
      },
      {
        id: 'room-02',
        name: 'Mirror Labyrinth',
        scareScore: 8.2,
        intensity: 'extreme',
        adjectives: ['intense', 'disorienting', 'loud'],
        recentComments: [
          {
            id: 'comment-03',
            author: 'Priya',
            note: 'The strobe + mirrors combo is wild.',
            score: 8,
            timestamp: '2025-09-25T21:20:00Z'
          }
        ]
      }
    ]
  },
  {
    id: 'hhr-02',
    name: 'BioLab Escape',
    theme: 'Mutant Outbreak',
    averageScore: 8.9,
    rooms: [
      {
        id: 'room-03',
        name: 'Quarantine Checkpoint',
        scareScore: 7.9,
        intensity: 'moderate',
        adjectives: ['intense', 'loud', 'urgent'],
        recentComments: [
          {
            id: 'comment-04',
            author: 'Luis',
            note: 'Actors were on point, lots of yelling!',
            score: 8,
            timestamp: '2025-09-25T21:45:00Z'
          }
        ]
      },
      {
        id: 'room-04',
        name: 'Containment Vault',
        scareScore: 9.4,
        intensity: 'extreme',
        adjectives: ['claustrophobic', 'dark', 'loud'],
        recentComments: [
          {
            id: 'comment-05',
            author: 'Mina',
            note: 'The vibrating floor took me out!',
            score: 10,
            timestamp: '2025-09-25T21:52:00Z'
          }
        ]
      }
    ]
  }
];
