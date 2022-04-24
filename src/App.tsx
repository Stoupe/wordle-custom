import { Button, Center } from "@mantine/core";
import { cleanNotifications, showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { Check, Refresh } from "tabler-icons-react";
import {
  NumberParam,
  QueryParamConfig,
  StringParam,
  useQueryParams,
} from "use-query-params";
import "./App.css";
import GameBoard from "./components/GameBoard";
import NumberSelector from "./components/NumberSelector";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { useSeed } from "./hooks/useSeed";
import {
  selectGameCreationState,
  setMaxGuesses,
  setWordLength,
} from "./state/gameCreationState";
import { generateNewGame, selectGameState } from "./state/gameState";

const App = () => {
  const options = useAppSelector(selectGameCreationState);
  const { maxGuesses, wordLength, correctWord, gameWordList } =
    useAppSelector(selectGameState);

  const dispatch = useAppDispatch();

  const { generateSeed, decodeSeed } = useSeed();

  const [query, setQuery] = useQueryParams({
    g: NumberParam,
    wl: NumberParam,
    seed: StringParam,
  });

  /**
   * Generate a new game when loaded for the first time
   */
  useEffect(() => {
    showNotification({
      title: "Generating new game...",
      message: "",
      color: "blue",
    });

    dispatch(
      generateNewGame({
        //TODO: validate query params
        maxGuesses: query.g ?? options.maxGuesses,
        wordLength: query.wl ?? options.wordLength,
      })
    );

    // Clear params from the URL
    setQuery({
      g: undefined,
      wl: undefined,
      seed: undefined,
    });
  }, []);

  useEffect(() => {
    showNotification({
      title: "New game generated!",
      message: "",
      color: "green",
      icon: <Check />,
    });
  }, [correctWord]);

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
