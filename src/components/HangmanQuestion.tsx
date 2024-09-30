import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { guessedOptionsState } from "../store/atoms";

type HangmanQuestionProps = {
  questionToGuess: string;
  reveal?: boolean;
};

function formatQuestion(questionToGuess: string): string[] {
  const formattedQuestion = questionToGuess.split("_").map((str) => str.trim());
  return formattedQuestion;
}

export function HangmanQuestion({
  questionToGuess,
}: HangmanQuestionProps) {
  const [formattedQuestion, setFormattedQuestion] = useState<string[]>([]);
  const guessedOptions = useRecoilValue(guessedOptionsState);
  const setGuessedOptions = useSetRecoilState(guessedOptionsState);

  useEffect(() => {
    const formattedQuestion = formatQuestion(questionToGuess);
    setFormattedQuestion(formattedQuestion);
  }, [questionToGuess]);

  const handleRemoveOption = (option: string) => {
    setGuessedOptions((current:string[]) => current.filter((o) => o !== option));
  };

  return (
    <div className="flex gap-1 text-2xl font-bold uppercase font-mono whitespace-nowrap">
      {formattedQuestion.map((word, index) => (
        <span className="flex items-center">
          {word}
          {index < formattedQuestion.length - 1 && (
            <span className="mx-3 relative">
              {guessedOptions[index] ? (
                <span
                  className="relative z-10 border-2 rounded-md px-2 pt-2 cursor-pointer"
                  onClick={() => handleRemoveOption(guessedOptions[index])}
                >
                  {guessedOptions[index]}
                </span>
              ) : (
                <span className="relative z-10 text-transparent">__________</span>
              )}
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-500"></span>
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
