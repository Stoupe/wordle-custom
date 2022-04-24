import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState, Tile } from "../../models/gameState";
import { getLetterState, pickRandom } from "../../utils";

// Word list from https://random-word-api.herokuapp.com/all
import wordList from "../../data/words.json";
import { CustomGameOptions } from "../gameCreationState";

const initialState: GameState = {
  maxGuesses: 5,
  wordLength: 5,
  isLoading: true,
  gameWon: false,
  gameLost: false,
  cheatMode: false,
  correctWord: undefined,
  currentGuess: [],
  prevGuesses: [],
  gameWordList: undefined,
};

export const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    generateNewGame: (
      state: GameState,
      action: PayloadAction<CustomGameOptions>
    ) => {
      const generationOptions = action.payload;

      state.maxGuesses = generationOptions.maxGuesses;
      state.wordLength = generationOptions.wordLength;

      state.cheatMode = false;
      state.gameWon = false;
      state.gameLost = false;
      state.currentGuess = [];
      state.prevGuesses = [];

      state.gameWordList = wordList.filter(
        (word) => word.length === generationOptions.wordLength
      );

      if (generationOptions.customWord) {
        state.correctWord = generationOptions.customWord;
      } else if (generationOptions.seed) {
        state.correctWord = state.gameWordList[0];
      } else {
        state.correctWord = pickRandom(state.gameWordList);
      }

      state.isLoading = false;
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
    toggleCheatMode: (state: GameState) => {
      state.cheatMode = !state.cheatMode;
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
          })
        ),
      ];

      state.currentGuess = [];

      if (guess === correctWord) {
        state.gameWon = true;
        return;
      }

      if (state.prevGuesses.length === state.maxGuesses) {
        state.gameLost = true;
      }
    },
  },
});

// Actions
export const {
  addToCurrentGuess,
  backspaceGuess,
  generateNewGame,
  processGuess,
  setLoading,
  toggleCheatMode,
} = gameStateSlice.actions;

// Reducer
export const gameStateReducer = gameStateSlice.reducer;
