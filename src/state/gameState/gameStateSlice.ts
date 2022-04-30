import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, Tile } from '../../models/gameState';
import { getLetterState, pickRandom } from '../../utils';

// Word list from https://random-word-api.herokuapp.com/all
import wordList from '../../data/words.json';
import { CustomGameOptions } from '../gameCreationState';
import { useSeed } from '../../hooks/useSeed';

const { decodeSeed } = useSeed();

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
  blockInput: false
};

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    generateNewGame: (state: GameState, action: PayloadAction<CustomGameOptions>) => {
      const generationOptions = action.payload;

      state.maxGuesses = generationOptions.maxGuesses;
      state.wordLength = generationOptions.wordLength;

      state.cheatMode = false;
      state.gameWon = false;
      state.gameLost = false;
      state.currentGuess = [];
      state.prevGuesses = [];

      const generationType = generationOptions.customWord
        ? 'custom'
        : generationOptions.seed
        ? 'seed'
        : 'random';

      // Set word length
      switch (generationType) {
        case 'custom':
          state.wordLength = generationOptions.customWord!.length;
          break;
        case 'seed':
          state.wordLength = decodeSeed(generationOptions.seed!).length;
          break;
        case 'random':
          state.wordLength = generationOptions.wordLength;
      }

      state.gameWordList = wordList.filter((word) => word.length === state.wordLength);

      // Set correct word
      switch (generationType) {
        case 'custom':
          if (!state.gameWordList.includes(generationOptions.customWord!)) {
            state.gameWordList.push(generationOptions.customWord!);
          }
          state.correctWord = generationOptions.customWord;
          break;
        case 'seed':
          state.correctWord = decodeSeed(generationOptions.seed!);
          break;
        case 'random':
          state.correctWord = pickRandom(state.gameWordList);
      }

      state.isLoading = false;
    },
    addToCurrentGuess: (state: GameState, action: PayloadAction<string>) => {
      if (state.currentGuess.length >= state.wordLength) return;
      if (!action.payload.match(/^[a-zA-Z]$/)) return;

      state.currentGuess.push({ letter: action.payload, state: 'unknown' });
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

      if (guess.startsWith('cheat')) {
        state.cheatMode = true;
        console.log(correctWord);
      }

      state.prevGuesses = [
        ...state.prevGuesses,

        guess.split('').map(
          (letter, index): Tile => ({
            letter,
            state: getLetterState(letter, index, guess, correctWord)
          })
        )
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
    setBlockInput: (state: GameState, action: PayloadAction<boolean>) => {
      state.blockInput = action.payload;
    }
  }
});

// Actions
export const {
  addToCurrentGuess,
  backspaceGuess,
  generateNewGame,
  processGuess,
  setLoading,
  toggleCheatMode,
  setBlockInput
} = gameStateSlice.actions;

// Reducer
export const gameStateReducer = gameStateSlice.reducer;
