export enum CardType {
  TALK_LIGHT = 'TALK_LIGHT',
  TALK_FUNNY = 'TALK_FUNNY',
  TALK_DEEP = 'TALK_DEEP',
  ACTION = 'ACTION',
  EVENT = 'EVENT'
}

export enum GamePhase {
  HOME = 'HOME',
  SETUP = 'SETUP',
  NAMES = 'NAMES',
  PLAY = 'PLAY',
  RESULT = 'RESULT'
}

export interface Card {
  id: string;
  type: CardType;
  content: string;
  forbiddenWords?: string[];
  actionType?: string; // For visual tags like "Gesture", "Dance"
}

export interface Player {
  id: number;
  name: string;
  score: number;
}

export interface GameSettings {
  playerCount: number;
  isTeamMode: boolean;
  categories: CardType[];
  useForbidden: boolean;
  useAction: boolean;
  roundCount: number; // 999 for unlimited
}

export interface GameState {
  phase: GamePhase;
  settings: GameSettings;
  players: Player[];
  currentPlayerIndex: number;
  currentRound: number;
  deck: Card[];
  currentCardIndex: number;
  scores: Record<number, number>; // PlayerID -> Score
  bestMoments: Card[]; // Store a few cards for the result screen
}