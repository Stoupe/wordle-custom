import { createContext, ReactNode, useContext, useState } from "react";

export interface CustomGameOptions {
  maxGuesses: number;
  wordLength: number;
  customWord?: string;
}

export const useCustomState = (initialOptions: CustomGameOptions) => {
  const [options, setOptions] = useState<CustomGameOptions>(initialOptions);

  return {
    setWordLength: (newLength: number) =>
      setOptions((prev) => ({ ...prev, wordLength: newLength })),
    setMaxGuesses: (newMaxGuesses: number) =>
      setOptions((prev) => ({ ...prev, maxGuesses: newMaxGuesses })),
    options,
    setOptions,
  };
};

const GameContext = createContext<ReturnType<typeof useCustomState> | null>(
  null
);

export const useGameContext = () => useContext(GameContext)!;

export const GameProvider = ({ children }: { children: ReactNode }) => (
  <GameContext.Provider
    value={useCustomState({ maxGuesses: 5, wordLength: 5 })}
  >
    {children}
  </GameContext.Provider>
);
