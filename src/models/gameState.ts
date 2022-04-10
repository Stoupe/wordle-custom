export type LetterState = "incorrect" | "wrongLocation" | "correct" | "unknown";

export interface Tile { 
    letter: string | undefined, 
    state: LetterState 
};

export interface GameState {
    /** 0 for infinite guesses */
    maxGuesses: number;

    wordLength: number;
    loading: boolean;
    gameWon: boolean;
    cheatMode: boolean;

    // wordList: string[];

    correctWord: string;
    currentGuess: Tile[];
    prevGuesses: Array<Tile[]>;
  }