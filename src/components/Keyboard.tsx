type KeyboardProps = {
  options: string[],
  disabled?: boolean,
  guessedOptions: string[],
  activeLetters: string[],
  addGuessedOption: (letter: string) => void
}

export function Keyboard({
  options,
  guessedOptions,
  activeLetters,
  addGuessedOption: addGuessedOption,
  disabled = false,
}: KeyboardProps) {
  return (
    <div>
      {options.map(option => {
        const isGuessed = guessedOptions.includes(option);
        return (
          <button
            onClick={() => addGuessedOption(option)}
            className={`text-2xl uppercase p-2 font-bold border-2  m-0.5 ${isGuessed ? 'bg-gray-300 cursor-not-allowed text-gray-300 border-gray-300' :'text-black border-black  hover:bg-[hsl(200,100%,75%)] '}`}
            option={option}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
