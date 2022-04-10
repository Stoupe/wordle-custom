import { Box, Text, Transition } from "@mantine/core";
import { Tile } from "../models/gameState";

export type LetterBoxState = "default" | "green" | "orange";

/**
 * Represents a single letter box in the game board.
 * If tile is undefined, a blank letter box is rendered.
 * @returns
 */
const LetterBox = ({ tile }: { tile: Tile | undefined }) => {
  return (
    <Box
      // style={style}
      sx={(theme) => ({
        padding: "2rem",
        background:
          tile?.state === "correct"
            ? theme.colors.green
            : tile?.state === "wrongLocation"
            ? theme.colors.orange["6"]
            : tile?.state === "incorrect"
            ? theme.fn.darken(theme.colors.gray["7"], 0.15)
            : theme.colors.gray["7"],
        width: "2rem",
        height: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0.5rem",
      })}
    >
      <Transition
        transition={"pop"}
        duration={200}
        mounted={tile?.letter !== undefined}
      >
        {(style) => (
          <Text
            style={style}
            sx={{
              fontSize: tile ? "2rem" : "0",
              // transition: "font-size 0.1s",
            }}
            weight={"bold"}
            color={"white"}
          >
            {tile?.letter?.toLocaleUpperCase()}
          </Text>
        )}
      </Transition>
    </Box>
  );
};

export default LetterBox;
