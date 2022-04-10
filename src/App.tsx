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
            Word:{" "}
            {cheatMode ? correctWord : correctWord?.split("").map((l) => "?")}
          </Text>
        </Center>
        <GameBoard />
      </Center>
    </>
  );
};

export default App;
