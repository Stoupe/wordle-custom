import { configureStore } from "@reduxjs/toolkit";
import { gameCreationReducer } from "../state/gameCreationState";
import { gameStateReducer } from "../state/gameState";

export const store = configureStore({
  reducer: {
    gameState: gameStateReducer,
    gameCreation: gameCreationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
