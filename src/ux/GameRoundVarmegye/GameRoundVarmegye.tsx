import { FormEvent, useState, useEffect } from "react";
import { dataBank, VarmegyeCode } from "../../gamedata/dataBank.ts";
import { sanitizeString } from "../../../provincle/src/utils/utils.ts";
import { useTranslation } from "react-i18next";
import { GameRoundProps } from "../../../provincle/src/types/GameRoundProps.ts";
import { GameRoundResult, PotCode } from "../../../provincle/src/types/data.ts";
import { AutoSuggestInput } from "../../../provincle/src/components/AutoSuggestInput/AutoSuggestInput.tsx";
import { GuessButton } from "../../../provincle/src/components/GuessButton/GuessButton.tsx";
//import i18n from "../../gamedata/i18n.ts";
import {
  SQUARE_ANIMATION_LENGTH,
  squares,
  toastError,
  toastFailed,
  toastSuccess,
} from "../../../provincle/src/utils/animations.ts";
import { Guesses } from "../../../provincle/src/components/Guesses/Guesses.tsx";
import confetti from "canvas-confetti";

function GameRoundVarmegye({
  gameRoundId,
  gameState,
  currentRoundStatus,
  setCurrentRoundStatus,
  setRoundResult,
}: GameRoundProps) {
  const { t } = useTranslation();
  // const t = i18n.getFixedT("LOLcalize");
  const { t: tGeo } = useTranslation("geo");

  const potCode: string = gameState.potCode;

  const maxAttempts = 3;

  const [guessNum, setGuessNum] = useState<number>(1);
  const incGuessNum = (): void => {
    setGuessNum(guessNum + 1);
  };

  const [guesses, setGuesses] = useState<string[]>([]);
  const addGuess = (guess: string): void => {
    setGuesses([...guesses, guess]);
  };

  const [currentGuess, setCurrentGuess] = useState("");

  function getPotMapSvgUrl(potCode: VarmegyeCode): string {
    //return `./varmegyle/assets/HU-${potCode.toUpperCase()}.svg`;
    return new URL(
      `../../../assets/HU-${potCode.toUpperCase()}.svg`,
      import.meta.url
    ).href;
  }

  useEffect(() => {
    // if (guesses.length === maxAttempts) {
    //   console.log(`Game over! (${currentRoundStatus})`);
    // }
    setCurrentGuess("");
  }, [guesses]);

  // prettier-ignore
  function grade(guess: string): GameRoundResult {
    //if (guess === gameState.potCode) {
    if (sanitizeString(tGeo(potCode)) === sanitizeString(guess)) {
      return guesses.length === 0 ? GameRoundResult.Excellent
           : guesses.length === 1 ? GameRoundResult.Good
           :                        GameRoundResult.Fair;
    } else {
      return guesses.length === 0 ? GameRoundResult.NotStarted
                                  : GameRoundResult.Failed;
    }
  }

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!dataBank.isValidCode(currentGuess, tGeo)) {
      toastError(t("unknownPot"));
      return;
    }

    if (guesses.includes(currentGuess)) {
      toastError(t("alreadyGuessed"));
      return;
    }

    if (sanitizeString(tGeo(potCode)) === sanitizeString(currentGuess)) {
      setTimeout(() => {
        setCurrentRoundStatus("won");
        toastSuccess(t("guessedIt"));
        confetti();
      }, SQUARE_ANIMATION_LENGTH * squares.length);
      setRoundResult(gameRoundId, grade(currentGuess));
      console.log("grade " + grade(currentGuess));
    } else if (guesses.length + 1 === maxAttempts) {
      setTimeout(() => {
        toastFailed(t("failedIt"));
        setCurrentRoundStatus("lost");
      }, SQUARE_ANIMATION_LENGTH * squares.length);
      setRoundResult(gameRoundId, grade(currentGuess));
    }

    addGuess(currentGuess);
    setTimeout(() => {
      incGuessNum();
    }, SQUARE_ANIMATION_LENGTH * squares.length);
    // console.log("currentRoundStatus:", currentRoundStatus);
  };

  const handleGuessButtonClicked = (): void => {
    console.log("Guess button clicked.");
  };

  return (
    <div>
      {/* page part 1: the problem statement - not shown on original Worldle on 1st round
      <div className="gap-1 text-center">
        <p>Name the province or territory</p>
      </div>
       */}
      <div>
        <img
          src={getPotMapSvgUrl(potCode as VarmegyeCode)}
          alt="silhouette of a province or territory"
          className="max-h-52 m-auto my-5 transition-transform duration-700 ease-in dark:invert h-full"
        />
      </div>
      <form
        onSubmit={handleFormSubmission}
        className={`flex flex-col py-0.5 ${currentRoundStatus !== "pending" ? "hidden" : ""}`}
      >
        <div className="flex flex-grow">
          <AutoSuggestInput
            currentGuess={currentGuess}
            setCurrentGuess={setCurrentGuess}
            placeholder={`vármegye`}
            suggestionsArray={dataBank.getPotNamesByLang(tGeo)}
          />
          <GuessButton
            onClick={handleGuessButtonClicked}
            text={`\u{1F1ED}\u{1F1FA} ${t("guessVerb")}`}
          />
        </div>
      </form>
      <Guesses
        currentRoundStatus={currentRoundStatus}
        guesses={guesses}
        maxAttempts={maxAttempts}
        solutionCode={potCode as PotCode}
        guessNum={guessNum}
        t={t}
        tGeo={tGeo}
        dataBank={dataBank}
      />
    </div>
  );
}

export default GameRoundVarmegye;
