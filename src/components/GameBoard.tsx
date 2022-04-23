import { Box, Group, LoadingOverlay, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { Check, Confetti, ExclamationMark, MoodCry } from "tabler-icons-react";
import { useGameContext } from "../context/store";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  addToCurrentGuess,
  backspaceGuess,
  generateNewGame,
  processGuess,
  selectGameState,
  setLoading,
} from "../slices/gameStateSlice";
import { asString, isValidGuess } from "../utils";
import LetterBox from "./LetterBox";

const GameBoard = () => {
  const { options } = useGameContext();

  const {
    isLoading,
    currentGuess,
    maxGuesses,
    gameWon,
    gameLost,
    prevGuesses,
    wordLength,
    cheatMode,
    correctWord,
    gameWordList,
  } = useAppSelector(selectGameState);

  const dispatch = useAppDispatch();

  const guessKey = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (currentGuess.length > 0) {
        dispatch(backspaceGuess());
      }
    } else if (e.key === "Enter") {
      const validResponse = isValidGuess(
        asString(currentGuess),
        wordLength,
        gameWordList ?? []
      );

      switch (validResponse) {
        case "VALID":
          dispatch(processGuess(asString(currentGuess)));
          break;
        case "NOT_IN_LIST":
          showNotification({
            title:
              "Sorry, '" +
              asString(currentGuess) +
              "' is not in the word list.",
            message:
              "If you think it should be, please request it to be added.",
            color: "red",
            icon: <ExclamationMark />,
          });
          break;
        case "TOO_LONG":
        case "TOO_SHORT":
        default:
          showNotification({
            title: "Guess must be " + wordLength + " letters long.",
            message: "",
            color: "red",
            icon: <ExclamationMark />,
          });
      }
    } else if (e.key.match(/^[a-zA-Z]$/) && currentGuess.length < wordLength) {
      dispatch(addToCurrentGuess(e.key));
    }
  };

  /**
   * Generate a new game when loaded for the first time
   */
  useEffect(() => {
    showNotification({
      title: "Generating new game...",
      message: "",
      color: "blue",
    });
    dispatch(generateNewGame(options));
  }, []);

  useEffect(() => {
    showNotification({
      title: "New game generated!",
      message: "",
      color: "green",
      icon: <Check />,
    });
  }, [correctWord]);

  useEffect(() => {
    if (gameWon) {
      showNotification({
        color: "green",
        title: "Correct Guess",
        message: "You guessed the word correctly!",
        icon: <Confetti />,
      });
      confetti();
    }
  }, [gameWon]);

  useEffect(() => {
    if (gameLost) {
      showNotification({
        title: "Game Over",
        color: "red",
        message: (
          <>
            You ran out of guesses! The correct word was '<b>{correctWord}</b>'.
          </>
        ),
        autoClose: false,
        icon: <MoodCry />,
      });
    }
  }, [gameLost]);

  // We need to add the event listener every time the currentGuess changes due to rendering issues
  useEffect(() => {
    if (isLoading || gameWon || gameLost) return;

    window.addEventListener("keydown", guessKey);
    return () => window.removeEventListener("keydown", guessKey);
  }, [currentGuess, isLoading, gameWon]);

  return (
    <Box
      sx={({ colorScheme, colors }) => ({
        background:
          colorScheme === "dark" ? colors.dark["6"] : colors.gray["3"],
        padding: "4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        borderRadius: "1rem",
        minWidth: "32rem",
        minHeight: "25rem",
      })}
      tabIndex={0}
    >
      <LoadingOverlay
        overlayColor="black"
        overlayOpacity={0.1}
        visible={isLoading}
        loaderProps={{
          color: "gray",
          size: "lg",
        }}
      />

      {cheatMode && (
        <Text weight="bold" align="center">
          {correctWord}
        </Text>
      )}

      {!isLoading &&
        [...Array(maxGuesses)].map((_, i) => (
          <Group key={i}>
            {[...Array(wordLength)].map((_, j) => (
              <LetterBox
                key={i + "," + j}
                tile={
                  prevGuesses[i]
                    ? prevGuesses[i][j] ?? undefined
                    : prevGuesses[i - 1] || i === 0
                    ? currentGuess[j] ?? undefined
                    : undefined
                }
              ></LetterBox>
            ))}
          </Group>
        ))}
    </Box>
  );
};

export default GameBoard;
