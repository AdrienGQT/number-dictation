import React, { useRef, useState } from "react";
import MainButton from "./components/MainButton";
import NumberInput from "./components/NumberInput";
import speak from "./tools/speak";
import ListenButton from "./components/ListenButton";
import ProgressBar from "./components/ProgressBar";
import playSound from "./tools/playSound";

export default function Form() {
    const RANGE = { min: 0, max: 99 };
    const MAX_INDEX = 5;

    const formRef = useRef<HTMLFormElement>(null);

    const [currentNumber, setCurrentNumber] = useState<number | null>(null);
    const [dictationIndex, setDictationIndex] = useState<number>(1);
    const [isGameInProgress, setisGameInProgress] = useState<boolean>(false);
    const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

    const getRandomNumber = () => {
        const min = Math.ceil(RANGE.min);
        const max = Math.floor(RANGE.max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const refreshNumber = () => {
        const randomNumber = getRandomNumber();
        setCurrentNumber(randomNumber);
        speak(randomNumber, "default", 600);
    };

    // Start a new dictation
    const startDictation = () => {
        setisGameInProgress(true);
        refreshNumber();
    };

    // End current ditaction
    const endDictation = () => {
        setDictationIndex(1);
        setCurrentNumber(null);
    };

    const resetGame = () => {
        endDictation();
        setisGameInProgress(false);
        setIsGameFinished(false);
    };

    // Handle form sumbmit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        if (!form) return;

        const formData = new FormData(form);
        const answer = formData.get("answer") as string;
        if (!answer) return;

        const answerAsNumber = parseInt(answer);
        checkAnswer(answerAsNumber);
    };

    // Reset form content
    const resetForm = () => {
        const form = formRef.current;
        if (!form) return;

        form.reset();
    };

    // Handle correct answer
    const handleCorrectAnswer = () => {
        playSound("correct");
        if (dictationIndex !== MAX_INDEX) {
            setDictationIndex(dictationIndex + 1);
            refreshNumber();
        } else {
            handleVictory();
        }
        resetForm();
    };

    // Handle uncorrect answer
    const handleUncorrectAnswer = () => {
        playSound("error");
    };

    const checkAnswer = (answer: number) => {
        if (answer === currentNumber) {
            handleCorrectAnswer();
        } else {
            handleUncorrectAnswer();
        }
    };

    const handleVictory = () => {
        playSound("victory", 1000);
        setIsGameFinished(true);
    };

    return (
        <div className="w-full max-w-sm p-2">
            {!isGameInProgress && (
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-0">
                        <p className="text-base-900 text-2xl font-pally font-bold text-center">
                            It's time for a
                        </p>
                        <h1 className="text-base-900 text-4xl font-pally font-extrabold text-center">
                            Number dictation!
                        </h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-base-900 text-lg font-pally font-light text-center">
                            Your job is simple: listen carrefuly to the voice,
                            try to guess the number, write it and click
                            'Confirm'! There will be {MAX_INDEX} numbers to
                            guess.
                        </h2>
                        <p className="text-base-900 text-lg font-pally font-light text-center">
                            Click the 'Start' button when you feel ready.
                        </p>
                    </div>

                    {/* <button
                        onClick={startDictation}
                        className="bg-forest-500 font-pally font-semibold pl-3 pr-3 pt-2 pb-2 rounded-lg text-lg text-base-050 border-2 border-transparent hover:border-forest-400 drop-shadow-xs cursor-pointer"
                    >
                        Start!
                    </button> */}
                    <MainButton onClick={startDictation}>Start!</MainButton>
                </div>
            )}

            {isGameInProgress && (
                <div className="flex flex-col gap-8">
                    {!isGameFinished && (
                        <>
                            {/* Progress Bar */}
                            <ProgressBar
                                index={dictationIndex}
                                max={MAX_INDEX}
                            />

                            {/* Repeat buttons */}
                            <div className="flex gap-2">
                                <ListenButton
                                    number={currentNumber}
                                    rate="default"
                                >
                                    Listen again
                                </ListenButton>
                                <ListenButton
                                    number={currentNumber}
                                    rate="slow"
                                >
                                    Listen slower
                                </ListenButton>
                            </div>

                            {/* Form */}
                            <form
                                className="flex flex-col gap-3"
                                onSubmit={handleSubmit}
                                ref={formRef}
                            >
                                <div className="flex flex-col gap-1">
                                    <p className="font-pally text-lg font-medium text-base-900">
                                        What number do you hear?
                                    </p>
                                    <NumberInput />
                                </div>
                                <MainButton doSubmit={true}>
                                    Confirm!
                                </MainButton>
                            </form>
                        </>
                    )}
                    {isGameFinished && (
                        <div className="flex flex-col gap-32">
                            <div className="flex flex-col gap-4">
                                <p className="text-base-900 text-2xl font-pally font-bold text-center">
                                    Congratulations!
                                </p>
                                <p className="text-base-900 text-lg font-pally font-light text-center">
                                    You did very well for this serie of {MAX_INDEX}
                                    ! Go to homepage by clicking the
                                    button below and start a new game.
                                </p>
                            </div>

                            <MainButton onClick={resetGame}>
                                Go to homepage
                            </MainButton>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
