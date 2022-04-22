import { showNotification } from "@mantine/notifications";
import { cloneDeep } from "lodash";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Refresh } from "tabler-icons-react";
import { GameState, Tile } from "../models/gameState";
import { pickRandom } from "../utils";

const defaultGameState: GameState = {
  maxGuesses: 5,
  wordLength: 5,
  loading: true,
  gameWon: false,
  cheatMode: false,
  correctWord: "",
  currentGuess: [],
  prevGuesses: [],
};

const backspaceGuess = (gameState: GameState): GameState => {
  const newState = cloneDeep(gameState);
  if (newState.currentGuess.length === 0) return gameState;
  newState.currentGuess = newState.currentGuess.slice(0, -1);
  return newState;
};

const addToCurrentGuess = (letter: string, gameState: GameState): GameState => {
  const newState = cloneDeep(gameState);
  const { currentGuess, wordLength } = newState;

  if (currentGuess.length >= wordLength) return gameState;
  if (!letter.match(/^[a-zA-Z]$/)) return gameState;

  newState.currentGuess.push({ letter, state: "unknown" });

  return newState;
};

/**
 * Takes in a letter and information about the current guess
 * and returns the state the letter should be in
 * @param letter
 * @param index
 * @param guess
 * @param correctWord
 * @returns
 */
const getLetterState = (
  letter: string,
  index: number,
  guess: string,
  correctWord: string
): Tile["state"] => {
  // Letter not in the correct word at all in correct word
  if (!correctWord.split("").includes(letter)) {
    return "incorrect";
  }

  if (correctWord.includes(letter)) {
    // Correct letter in the correct position
    if (correctWord[index] === letter) {
      return "correct";
    }

    // Correct letter which hasn't been guessed yet, but in the wrong position
    const notYetGuessedLetters = correctWord
      .split("")
      .filter((letter, i) => guess[i] !== letter);

    if (notYetGuessedLetters.includes(letter)) {
      return "wrongLocation";
    }
  }

  // Letter either not in the word or already placed elsewhere correctly
  return "incorrect";
};

const processGuess = (guess: string, gameState: GameState): Tile[] => {
  const { correctWord } = gameState;

  const processedGuess = guess.split("").map((letter, index) => ({
    letter: letter,
    state: getLetterState(letter, index, guess, correctWord),
  }));

  return processedGuess;
};

const makeGuess = (gameState: GameState, wordList: string[]): GameState => {
  const newState = cloneDeep(gameState);
  const { currentGuess, correctWord } = newState;
  const guess: string = currentGuess.map((letter) => letter.letter).join("");

  if (guess === "cheat") {
    newState.cheatMode = true;
  }

  newState.prevGuesses = [
    ...newState.prevGuesses,
    processGuess(guess, newState),
  ];

  if (guess === correctWord) {
    newState.gameWon = true;
  }

  newState.currentGuess = [];

  return newState;
};

const setLoading = (loading: boolean, gameState: GameState): GameState => {
  const newState = cloneDeep(gameState);
  newState.loading = loading;
  return newState;
};

const setCorrectWordRandomly = (
  gameState: GameState,
  wordList: string[]
): GameState => {
  const newState = cloneDeep(gameState);

  newState.correctWord = pickRandom(
    wordList.filter((word) => word.length === gameState.wordLength)
  );

  return newState;
};

const isValidGuess = (gameState: GameState, wordList: string[]): boolean => {
  const { wordLength, currentGuess } = gameState;
  const guess = currentGuess.map((letter) => letter.letter).join("");

  if (guess.length !== wordLength) {
    showNotification({
      color: "red",
      title: "Invalid Guess",
      message: "Guess must be " + wordLength + " letters long",
    });
    return false;
  }

  if (!wordList.includes(guess)) {
    showNotification({
      color: "red",
      title: "Invalid Guess",
      message: "Guess must be a word",
    });
    return false;
  }

  return true;
};

const resetGame = (resetState: GameState): GameState => {
  const newState = cloneDeep(resetState);
  newState.loading = false;
  return newState;
};

export const useGameState = (
  initial: GameState = defaultGameState,
  initialWordList = []
) => {
  const [gameState, setGameState] = useState<GameState>(initial);
  const [wordList, setWordList] = useState<string[]>(initialWordList);

  useEffect(() => {
    const timer = Date.now();
    // Word list taken from https://random-word-api.herokuapp.com/all
    fetch("./src/data/words.json")
      .then((res) => res.json())
      .then((words: string[]) => {
        console.log(words)
        setWordList(words);
        showNotification({
          message:
            "Took " + (Date.now() - timer) / 1000 + " seconds to fetch words",
          title: "Words Fetched",
        });
        setGameState((state) => setLoading(false, state));
      });
  }, []);

  useEffect(() => {
    setGameState((state) => setCorrectWordRandomly(state, wordList));
  }, [wordList]);

  // useEffect(() => {
  //   console.log(gameState);
  // }, [gameState]);

  return {
    ...gameState,

    resetGame: () => {
      setGameState(setCorrectWordRandomly(resetGame(initial), wordList));
      showNotification({
        message: "A new word has been chosen",
        title: "Game Reset",
        icon: <Refresh />,
      });
    },

    makeGuess: () => {
      if (isValidGuess(gameState, wordList)) {
        setGameState((state) => makeGuess(state, wordList));
      }
    },
    addToCurrentGuess: (letter: string) =>
      setGameState((state) => addToCurrentGuess(letter, state)),
    backspaceGuess: () => setGameState((state) => backspaceGuess(state)),
    setLoading: (loading: boolean) =>
      setGameState((state) => setLoading(loading, state)),
    setCorrectWordRandomly: () =>
      setGameState((state) => setCorrectWordRandomly(state, wordList)),
    wordList,
    setWordList: (wordList: string[]) => setWordList(wordList),
  };
};

// Context
const GameContext = createContext<ReturnType<typeof useGameState> | null>(null);

export const useGameContext = () => useContext(GameContext)!;

export const GameProvider = ({ children }: { children: ReactNode }) => (
  <GameContext.Provider value={useGameState()}>{children}</GameContext.Provider>
);
