import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "./components/HangmanDrawing";
import { HangmanQuestion } from "./components/HangmanQuestion";
import { Keyboard } from "./components/Keyboard";
import { useRecoilState } from "recoil";
import { guessedOptionsState } from "./store/atoms";
import questions from "./utils/questionsList.json";
import options from "./utils/optionsList.json";
import answers from "./utils/answerList.json";

interface Props {
  guessedOptions: string[];
  answers: string[];
  setIsWinner: (isWinner: boolean) => void;
  incorrectGuesses: number;
  setIncorrectGuesses: (incorrectGuesses: number) => void;
}

const SubmitAnswer: React.FC<Props> = ({ guessedOptions, answers, setIsWinner, incorrectGuesses, setIncorrectGuesses }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const sortedAnswers = answers.map(answer => answer.toLowerCase()).slice().sort();
    const sortedGuessedOptions = guessedOptions.map(option => option.toLowerCase()).slice().sort();

    const areEqual = sortedAnswers.length === sortedGuessedOptions.length &&
      sortedAnswers.every((value, index) => value === sortedGuessedOptions[index]);

    setIsWinner(areEqual);
    if (!areEqual) {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
    console.log("Are Equal:", areEqual);
  };

  return (
    <button className="border-2 h-14 w-5/12 p-4 bg-blue-500 text-white font-bold font-mono rounded-lg" onClick={handleClick}>
      CHECK
    </button>
  );
};

function getQuestion() {
  return questions[Math.floor(Math.random() * questions.length)];
}

function App() {
  const [questionToGuess, setQuestionToGuess] = useState(getQuestion);
  const [guessedOptions, setGuessedOptions] = useRecoilState(guessedOptionsState);
  const [Options, setOptions] = useState<string[]>(options);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [isLoser, setIsLoser] = useState<boolean>(false);
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);

  const addGuessedOption = useCallback(
    (option: string) => {
      if (guessedOptions.length < 2 && !guessedOptions.includes(option)) {
        setGuessedOptions(current => [...current, option]);
      }
    },
    [guessedOptions]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      resetGame();
    };

    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  const resetGame = () => {
    setGuessedOptions([]); 
    setIncorrectGuesses(0); 
    setQuestionToGuess(getQuestion()); 
    setIsWinner(false); 
    setIsLoser(false); 
  };

  useEffect(() => {
    if (incorrectGuesses >= 6) {
      setIsLoser(true);
    }
  }, [incorrectGuesses]);

  return (
      <div className="max-w-3xl h-screen flex flex-col gap-8 mx-auto items-center">
        <div className="text-2xl text-center">
          {isWinner && "Winner! - Refresh to try again"}
          {isLoser && "Nice Try - Refresh to try again"}
        </div>
        <HangmanQuestion
          questionToGuess={questionToGuess}
        />
        <div className="w-full">
          <Keyboard
            guessedOptions={guessedOptions}
            options={Options}
            disabled={isWinner || isLoser}
            activeLetters={guessedOptions.filter(letter => questionToGuess.includes(letter))}
            addGuessedOption={addGuessedOption}
          />
        </div>
        <HangmanDrawing numberOfGuesses={incorrectGuesses} />
        <SubmitAnswer
          guessedOptions={guessedOptions}
          answers={answers}
          setIsWinner={setIsWinner}
          incorrectGuesses={incorrectGuesses}
          setIncorrectGuesses={setIncorrectGuesses}
        />
      </div>
  );
}

export default App;
