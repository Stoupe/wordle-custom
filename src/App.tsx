import { Button, Center } from "@mantine/core";
import { cleanNotifications } from "@mantine/notifications";
import { Refresh } from "tabler-icons-react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import NumberSelector from "./components/NumberSelector";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import {
  selectGameCreationState,
  setMaxGuesses,
  setWordLength,
} from "./state/gameCreationState";
import { generateNewGame } from "./state/gameState";

const App = () => {
  const options = useAppSelector(selectGameCreationState);
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
            value={options.wordLength}
            onChange={(newLength) =>
              newLength <= 15 &&
              newLength >= 3 &&
              dispatch(setWordLength(newLength))
            }
          />
          <NumberSelector
            title="Guesses"
            value={options.maxGuesses}
            onChange={(newMaxGuesses) =>
              newMaxGuesses > 0 && dispatch(setMaxGuesses(newMaxGuesses))
            }
          />
          <Button
            variant="filled"
            radius="md"
            color="dark"
            rightIcon={<Refresh />}
            onClick={() => {
              cleanNotifications();
              dispatch(generateNewGame(options));
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
