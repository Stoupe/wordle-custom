import { Button, Center } from "@mantine/core";
import { cleanNotifications, showNotification } from "@mantine/notifications";
import { Refresh } from "tabler-icons-react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import NumberSelector from "./components/NumberSelector";
import { useGameContext } from "./context/store";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { generateNewGame } from "./slices/gameStateSlice";

const App = () => {
  const { setWordLength, setMaxGuesses, settings, wordList } = useGameContext();

  const dispatch = useAppDispatch();

  return (
    <>
      <Center
        sx={({ colorScheme, colors, white }) => ({
          width: "100vw",
          height: "100vh",
          background: colorScheme === "dark" ? colors.dark["7"] : white,
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
              colorScheme === "dark" ? colors.dark["6"] : colors.gray["3"],
            borderRadius: "1rem",
            width: "32rem",
            justifyContent: "space-between",
            gap: "1rem",
          })}
        >
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
            onClick={() => {
              cleanNotifications();
              dispatch(
                generateNewGame({ wordList, generationSettings: settings })
              );
            }}
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
