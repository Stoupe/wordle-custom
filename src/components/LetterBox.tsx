import { Box, Text, Transition } from "@mantine/core";
import { useEffect, useState } from "react";

export type LetterBoxState = "default" | "green" | "orange";

const LetterBox = ({
  letter,
  state = "default",
}: {
  letter: string;
  state?: LetterBoxState;
}) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Transition transition={"scale"} mounted={true}>
      {(style) => (
        <Box
          style={style}
          sx={(theme) => ({
            padding: "2rem",
            background:
              state === "default"
                ? theme.colors.gray["7"]
                : state === "green"
                ? theme.colors.green
                : theme.colors.orange["6"],
            width: "2rem",
            height: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "0.5rem",
          })}
        >
          <Text sx={{ fontSize: "2rem" }} weight={"bold"} color={"white"}>
            {letter.toLocaleUpperCase()}
          </Text>
        </Box>
      )}
    </Transition>
  );
};

export default LetterBox;
