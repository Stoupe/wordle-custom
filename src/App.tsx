import {
  Box,
  Button,
  Center,
  Group,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import confetti from "canvas-confetti";
import { MouseEventHandler, useEffect, useState } from "react";
import { Confetti, Keyboard, Refresh } from "tabler-icons-react";
import "./App.css";
import LetterBox from "./components/LetterBox";
import { calculateColor, pickRandom } from "./utils";

const App = () => {
  const [correctWord, setCorrectWord] = useState<string>();
  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [cheatMode, setCheatMode] = useState(false);

  const [gameWon, setGameWon] = useState(false);

  const resetGame = () => {
    setCurrentGuess("");
    setGuesses([]);
    setCorrectWord(pickRandom(words));
    setCheatMode(false);

    showNotification({
      title: "Game reset",
      message: "A new word has been chosen",
      color: "orange",
      icon: <Refresh />,
    });
  };

  const makeGuess = () => {
    if (currentGuess.length !== 5) {
      showNotification({
        color: "red",
        title: "Invalid Guess",
        message: "Guess must be 5 letters long",
      });
      return;
    }

    if (!words.includes(currentGuess)) {
      showNotification({
        color: "red",
        title: "Invalid Guess",
        message: "Guess must be a word",
      });
      return;
    }

    if (currentGuess === "cheat") {
      setCheatMode(true);
    }

    setGuesses((guesses) => [...guesses, currentGuess]);

    showNotification({
      title: "Made Guess",
      message: "You guessed " + currentGuess,
    });

    if (currentGuess === correctWord) {
      setGameWon(true);
    }

    setCurrentGuess("");
  };

  const guessKey = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      setCurrentGuess((currentGuess) => currentGuess?.slice(0, -1));
    } else if (e.key === "Enter") {
      makeGuess();
    } else if (e.key.match(/^[a-zA-Z]$/)) {
      setCurrentGuess((currentGuess) =>
        currentGuess.length < 5
          ? currentGuess + e.key.toLocaleLowerCase()
          : currentGuess
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    const timer = Date.now();
    fetch("https://random-word-api.herokuapp.com/all?swear=0")
      .then((res) => res.json())
      .then((json) => json.filter((word: string) => word.length === 5))
      .then((words) => {
        setWords(words);
        showNotification({
          message:
            "Took " + (Date.now() - timer) / 1000 + " seconds to fetch words",
          title: "Words Fetched",
        });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCorrectWord(pickRandom(words));
  }, [words]);

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

  return (
    <>
      <Center
        sx={(theme) => ({
          width: "100vw",
          height: "100vh",
          background: theme.colors.gray["9"],
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        })}
      >
        <Center
          px={"1rem"}
          py={"1rem"}
          sx={(theme) => ({
            background: theme.colors.gray["8"],
            borderRadius: "1rem",
            width: "32rem",
            justifyContent: "space-between",
            gap: "1rem",
          })}
        >
          <Button
            variant="filled"
            radius="md"
            color="dark"
            leftIcon={<Refresh />}
            onClick={resetGame}
          >
            Reset
          </Button>
          <Text color="white" weight="bold">
            Word: {cheatMode ? correctWord : "?????"}
          </Text>
        </Center>
        <Box
          sx={(theme) => ({
            background: theme.colors.gray["8"],
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
          {loading ? (
            <LoadingOverlay
              overlayColor="black"
              overlayOpacity={0.1}
              visible={words.length === 0}
              loaderProps={{
                color: "gray",
                size: "lg",
              }}
            />
          ) : guesses.length === 0 && currentGuess.length === 0 ? (
            <>
              <Keyboard color="gray" />
              <Text color={"gray"}>type to start guessing</Text>
            </>
          ) : (
            <>
              {guesses?.map((guess, index) => (
                <Group key={index}>
                  {guess.split("").map((letter, index) => (
                    <LetterBox
                      key={index}
                      letter={letter}
                      state={calculateColor(
                        letter,
                        index,
                        guess,
                        correctWord ?? ""
                      )}
                    />
                  ))}
                </Group>
              ))}
              {!gameWon && (
                <Group>
                  {["", "", "", "", ""].map((space, index) => {
                    if (currentGuess[index] !== undefined) {
                      return (
                        <LetterBox key={index} letter={currentGuess[index]} />
                      );
                    }
                    return <LetterBox key={index} letter={""} />;
                  })}
                  {/* {currentGuess?.split("").map((letter, index) => (
                  <LetterBox key={index} letter={letter} />
                ))} */}
                </Group>
              )}
            </>
          )}
        </Box>
      </Center>
    </>
  );
};

export default App;
