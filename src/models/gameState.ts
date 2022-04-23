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
  currentGuess: TileArray;
  prevGuesses: Array<Tile[]>;
}

export interface GameGenerationSettings {
  maxGuesses: number;
  wordLength: number;
  customWord?: string;
}

class TileArray extends Array<Tile> {
  constructor() {
    super();
  }

  toString(): string {
    return this.map((tile) => tile.toString()).join("");
  }
}
