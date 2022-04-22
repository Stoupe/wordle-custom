import { Button, Center } from "@mantine/core";
import { Refresh } from "tabler-icons-react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import NumberSelector from "./components/NumberSelector";
import { useGameContext } from "./context/store";

const App = () => {
  const {
    cheatMode,
    correctWord,
    resetGame,
    wordLength,
    setWordLength,
    maxGuesses,
    setMaxGuesses,
    generateNewGame,
    settings,
  } = useGameContext();

  return (
    <>
      <Center
        sx={({ colorScheme, colors, white }) => ({
          width: "100vw",
          height: "100vh",
          background: colorScheme === "dark" ? colors.dark["6"] : white,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        })}
      >
        <Center
          px={"1rem"}
          py={"1rem"}
          sx={({ colorScheme, colors }) => ({
            background:
              colorScheme === "dark" ? colors.dark["5"] : colors.gray["3"],
            borderRadius: "1rem",
            width: "32rem",
            justifyContent: "space-between",
            gap: "1rem",
          })}
        >
          {/* <Text weight="bold">
            {cheatMode ? correctWord : correctWord?.split("").map((l) => "?")}
          </Text> */}
          <NumberSelector
            title="Letters"
            value={settings.wordLength}
            onChange={setWordLength}
          />
          <NumberSelector
            title="Guesses"
            value={settings.maxGuesses}
            onChange={setMaxGuesses}
          />
          <Button
            variant="filled"
            radius="md"
            color="dark"
            rightIcon={<Refresh />}
            onClick={generateNewGame}
          >
            Generate
          </Button>
        </Center>
        <GameBoard />
      </Center>
    </>
  );
};

export default App;
