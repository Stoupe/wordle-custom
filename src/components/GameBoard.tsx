import { Box, Group, LoadingOverlay, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import confetti from "canvas-confetti";
import React, { useContext, useEffect, useState } from "react";
import { Refresh, Confetti, Keyboard } from "tabler-icons-react";
import { useGameContext, useGameState } from "../context/store";
import { pickRandom, calculateColor } from "../utils";
import LetterBox from "./LetterBox";

const GameBoard = () => {
  const {
    loading,
    currentGuess,
    maxGuesses,
    gameWon,
    backspaceGuess,
    addToCurrentGuess,
    makeGuess,
    setCorrectWordRandomly,
    prevGuesses,
    wordLength,
    wordList,
  } = useGameContext();

  const guessKey = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      backspaceGuess();
    } else if (e.key === "Enter") {
      makeGuess();
    } else if (e.key.match(/^[a-zA-Z]$/) && currentGuess.length < 5) {
      addToCurrentGuess(e.key);
    }
  };

  // useEffect(() => {
  //   if (!loading && wordList.length > 0) {
  //     console.log("choosing new word");
  //     setCorrectWordRandomly();
  //   }
  // }, [wordList, loading]);

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

  // We need to add the event listener every time the currentGuess changes due to rendering issues
  useEffect(() => {
    if (loading) return;

    window.addEventListener("keydown", guessKey);
    return () => window.removeEventListener("keydown", guessKey);
  }, [currentGuess, loading]);

  // useEffect(() => {
  //   window.addEventListener("keydown", guessKey);
  //   return () => window.removeEventListener("keydown", guessKey);
  // }, []);

  return (
    <Box
      sx={({ colorScheme, colors }) => ({
        background:
          colorScheme === "dark" ? colors.dark["5"] : colors.gray["3"],
        padding: "4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        borderRadius: "1rem",
        width: "32rem",
        minHeight: "25rem",
      })}
      tabIndex={0}
    >
      <LoadingOverlay
        overlayColor="black"
        overlayOpacity={0.1}
        visible={wordList.length === 0}
        loaderProps={{
          color: "gray",
          size: "lg",
        }}
      />

      {!loading &&
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
