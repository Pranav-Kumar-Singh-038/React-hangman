import { atom } from "recoil";

export const guessedOptionsState = atom<string[]>({
  key: "guessedOptionsState", 
  default: [],
});
