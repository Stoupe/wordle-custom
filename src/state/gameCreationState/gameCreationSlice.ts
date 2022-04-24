import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CustomGameOptions {
  maxGuesses: number;
  wordLength: number;
  customWord?: string;
  seed?: string;
}

const initialState: CustomGameOptions = {
  maxGuesses: 5,
  wordLength: 5
};

export const gameCreationSlice = createSlice({
  name: 'gameCreation',
  initialState,
  reducers: {
    setMaxGuesses: (state: CustomGameOptions, action: PayloadAction<number>) => {
      state.maxGuesses = action.payload;
    },
    setWordLength: (state: CustomGameOptions, action: PayloadAction<number>) => {
      state.wordLength = action.payload;
    },
    setCustomWord: (state: CustomGameOptions, action: PayloadAction<string>) => {
      state.customWord = action.payload;
    }
  }
});

// Actions
export const { setMaxGuesses, setWordLength, setCustomWord } = gameCreationSlice.actions;

// Reducer
export const gameCreationReducer = gameCreationSlice.reducer;
