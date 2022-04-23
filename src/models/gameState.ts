export type LetterState = "incorrect" | "wrongLocation" | "correct" | "unknown";

export interface Tile {
  letter: string | undefined;
  state: LetterState;
}

export interface GameState {
  /** 0 for infinite guesses */
  maxGuesses: number;

  wordLength: number;
  isLoading: boolean;
  gameWon: boolean;
  gameLost: boolean;
  cheatMode: boolean;

  gameWordList: string[] | undefined;

  correctWord?: string;
  currentGuess: Tile[];
  prevGuesses: Array<Tile[]>;
}
