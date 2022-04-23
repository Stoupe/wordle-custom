import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { useAppDispatch } from "../hooks/redux";
import { GameGenerationSettings, GameState, Tile } from "../models/gameState";
import { RootState } from "../store";
import {
  getLetterState,
  isValidGuess,
  pickNewWord,
  pickRandom,
} from "../utils";

const initialState: GameState = {
  maxGuesses: 5,
  wordLength: 5,
  isLoading: true,
  gameWon: false,
  cheatMode: false,
  correctWord: undefined,
  currentGuess: [],
  prevGuesses: [],
};

export const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    generateNewGame: (
      state: GameState,
      action: PayloadAction<{
        wordList: string[];
        generationSettings: GameGenerationSettings;
      }>
    ) => {
      const { wordList, generationSettings } = action.payload;
      state.maxGuesses = generationSettings.maxGuesses;
      state.wordLength = generationSettings.wordLength;

      state.cheatMode = false;
      state.gameWon = false;
      state.currentGuess = [];
      state.prevGuesses = [];

      state.correctWord = pickNewWord(wordList, generationSettings.wordLength);
    },
    addToCurrentGuess: (state: GameState, action: PayloadAction<string>) => {
      if (state.currentGuess.length >= state.wordLength) return;
      if (!action.payload.match(/^[a-zA-Z]$/)) return;

      state.currentGuess.push({ letter: action.payload, state: "unknown" });
    },
    backspaceGuess: (state: GameState) => {
      if (state.currentGuess.length === 0) return;
      state.currentGuess = state.currentGuess.slice(0, -1);
    },
    setLoading(state: GameState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    processGuess: (state: GameState, action: PayloadAction<string>) => {
      const correctWord = state.correctWord;
      if (!correctWord) {
        console.error("Can't process guess, no correct word set");
        return;
      }

      const guess = action.payload;

      if (guess.startsWith("cheat")) {
        state.cheatMode = true;
        console.log(correctWord);
      }

      state.prevGuesses = [
        ...state.prevGuesses,

        guess.split("").map(
          (letter, index): Tile => ({
            letter,
            state: getLetterState(letter, index, guess, correctWord),
            toString: () => letter,
          })
        ),
      ];

      state.currentGuess = [];

      if (guess === correctWord) {
        state.gameWon = true;
      }
    },
  },
});

export const {
  addToCurrentGuess,
  backspaceGuess,
  generateNewGame,
  processGuess,
  setLoading,
} = gameStateSlice.actions;

export const selectGameState = (state: RootState) => state.gameState;

export default gameStateSlice.reducer;
