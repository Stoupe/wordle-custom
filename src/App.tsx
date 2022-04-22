import { Button, Center, Text } from "@mantine/core";
import { Refresh } from "tabler-icons-react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import { useGameContext } from "./context/store";

const App = () => {
  const { cheatMode, correctWord, resetGame } = useGameContext();

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
          <Text weight="bold">
            Word:{" "}
            {cheatMode ? correctWord : correctWord?.split("").map((l) => "?")}
          </Text>
          <Text>Letters</Text>
          <Text>Guesses</Text>
          <Button
            variant="filled"
            radius="md"
            color="dark"
            leftIcon={<Refresh />}
            onClick={resetGame}
          >
            Reset
          </Button>
        </Center>
        <GameBoard />
      </Center>
    </>
  );
};

export default App;
