import { LetterBoxState } from '../components/LetterBox';
import { Tile } from '../models/gameState';

export const calculateColor = (
  guessedLetter: string,
  index: number,
  guessedWord: string,
  correctWord: string
): LetterBoxState => {
  // Letter not in the correct word at all in correct word
  if (!correctWord.split('').includes(guessedLetter)) {
    return 'default';
  }

  if (correctWord.includes(guessedLetter)) {
    // Correct letter in the correct position
    if (correctWord[index] === guessedLetter) {
      return 'green';
    }

    // Correct letter which hasn't been guessed yet, but in the wrong position
    const notYetGuessedLetters = correctWord
      .split('')
      .filter((letter, i) => guessedWord[i] !== letter);

    if (notYetGuessedLetters.includes(guessedLetter)) {
      return 'orange';
    }
  }

  // Letter either not in the word or already placed elsewhere correctly
  return 'default';
};

/**
 * Pick a random string from an array of strings
 * @param arr Array of strings
 * @returns the randomly picked string
 */
export const pickRandom = (arr: Array<string>): string =>
  arr[Math.floor(Math.random() * arr.length)];

/**
 * Calculate if a given guess is valid
 * @param guess
 * @param wordLength
 * @param wordList
 * @returns
 */
export const isValidGuess = (
  guess: string,
  expectedLength: number,
  wordList: string[]
): 'VALID' | 'TOO_SHORT' | 'TOO_LONG' | 'NOT_IN_LIST' => {
  if (guess.length > expectedLength) return 'TOO_LONG';
  if (guess.length < expectedLength) return 'TOO_SHORT';
  if (!wordList.includes(guess)) return 'NOT_IN_LIST';
  return 'VALID';
};

/**
 * Takes in a letter and information about the current guess
 * and returns the state the letter should be in
 */
export const getLetterState = (
  letter: string,
  index: number,
  guess: string,
  correctWord: string
): Tile['state'] => {
  // Letter not in the correct word at all in correct word
  if (!correctWord.split('').includes(letter)) {
    return 'incorrect';
  }

  if (correctWord.includes(letter)) {
    // Correct letter in the correct position
    if (correctWord[index] === letter) {
      return 'correct';
    }

    // Correct letter which hasn't been guessed yet, but in the wrong position
    const notYetGuessedLetters = correctWord.split('').filter((letter, i) => guess[i] !== letter);

    if (notYetGuessedLetters.includes(letter)) {
      return 'wrongLocation';
    }
  }

  // Letter either not in the word or already placed elsewhere correctly
  return 'incorrect';
};

export const asString = (arr: Array<Tile>): string => {
  return arr.map((tile) => tile.letter).join('');
};
