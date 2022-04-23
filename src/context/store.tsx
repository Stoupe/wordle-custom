import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import wordListJson from "../data/words.json";

export const useCustomState = (
  initialSettings: { maxGuesses: number; wordLength: number },
  initialWordList = []
) => {
  const [wordList, setWordList] = useState<string[]>(initialWordList);
  const [settings, setSettings] = useState<{
    maxGuesses: number;
    wordLength: number;
  }>({
    maxGuesses: initialSettings.maxGuesses,
    wordLength: initialSettings.wordLength,
  });

  useEffect(() => {
    // Word list taken from https://random-word-api.herokuapp.com/all
    const words = wordListJson;
    console.log(words);
    setWordList(words);
  }, []);

  return {
    wordList,
    setWordList: (wordList: string[]) => setWordList(wordList),
    setWordLength: (newLength: number) =>
      setSettings((prev) => ({ ...prev, wordLength: newLength })),
    setMaxGuesses: (newMaxGuesses: number) =>
      setSettings((prev) => ({ ...prev, maxGuesses: newMaxGuesses })),
    settings,
    setSettings,
  };
};

// Context
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
