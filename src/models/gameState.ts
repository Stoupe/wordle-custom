export type LetterState = "incorrect" | "wrongLocation" | "correct" | "unknown";

export interface Tile {
  letter: string | undefined;
  state: LetterState;
  toString: () => string;
}

export interface GameState {
  /** 0 for infinite guesses */
  maxGuesses: number;

  wordLength: number;
  isLoading: boolean;
  gameWon: boolean;
  cheatMode: boolean;

  // gameWordList: string[];

  correctWord?: string;
  currentGuess: Tile[];
  prevGuesses: Array<Tile[]>;
}

export interface GameGenerationSettings {
  maxGuesses: number;
  wordLength: number;
  customWord?: string;
}
