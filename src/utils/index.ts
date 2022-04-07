import { LetterBoxState } from "../components/LetterBox";

export const calculateColor = (
    guessedLetter: string,
    index: number,
    guessedWord: string,
    correctWord: string
  ): LetterBoxState => {
    // Letter not in the correct word at all in correct word
    if (!correctWord.split("").includes(guessedLetter)) {
      return "default";
    }

    if (correctWord.includes(guessedLetter)) {
      // Correct letter in the correct position
      if (correctWord[index] === guessedLetter) {
        return "green";
      }

      // Correct letter which hasn't been guessed yet, but in the wrong position
      const notYetGuessedLetters = correctWord
        .split("")
        .filter((letter, i) => guessedWord[i] !== letter);

      if (notYetGuessedLetters.includes(guessedLetter)) {
        return "orange";
      }
    }

    // Letter either not in the word or already placed elsewhere correctly
    return "default";
  };

export const pickRandom = (arr: Array<string>): string => (arr[Math.floor(Math.random() * arr.length)])