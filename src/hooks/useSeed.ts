import { useState } from "react";
import Hashids from "hashids";

const hashids = new Hashids();

export const useSeed = () => {
  const toArray = (word: string | undefined) => {
    if (!word) return [];
    if (word.length <= 0) return [];

    return word.split("").map((letter) => letter.charCodeAt(0));
  };

  const generateSeed = (word: string | undefined) =>
    hashids.encode(toArray(word));

  const decodeSeed = (encoded: string) =>
    hashids
      .decode(encoded)
      .map((charCode) => String.fromCharCode(Number(charCode)))
      .join("");

  return { generateSeed, decodeSeed };
};
