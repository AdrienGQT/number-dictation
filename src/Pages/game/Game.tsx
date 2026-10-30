import { useEffect, useRef, useState, type Dispatch } from "react";
import speak from "../../tools/speak";
import playSound from "../../tools/playSound";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";
import ListenButton from "../../components/ListenButton";
import MainButton from "../../components/MainButton";
import GameInput from "../../components/GameInput";
import type { Gamemode } from "../Home";

interface props {
    maxIndex: number;
    pool: string[];
    question: string;
    gamemode: Gamemode;
    gameErrorCount: number;
    setGameErrorCount: Dispatch<React.SetStateAction<number>>;
}

export default function Game({
    maxIndex,
    pool,
    question,
    gamemode,
    gameErrorCount,
    setGameErrorCount,
}: props) {
    const navigate = useNavigate();

    const formRef = useRef<HTMLFormElement>(null);

    const initializedRef = useRef(false);

    const [pickedItems, setPickedItems] = useState<string[]>([]);
    const [currentItem, setCurrentItem] = useState<string | null>(null);
    const [dictationIndex, setDictationIndex] = useState<number>(1);

    const [currentTriesCount, setCurrentTriesCount] = useState<number>(0);
    const [currentErrorCount, setCurrentErrorCount] = useState<number>(0);

    const refreshItem = () => {
        const remaining = pool.filter((item) => !pickedItems.includes(item));

        if (remaining.length === 0) return;

        const randomIndex = Math.floor(Math.random() * remaining.length);
        const randomItem = remaining[randomIndex];

        setCurrentItem(randomItem);

        setPickedItems((prev) => {
            const updated = [...prev, randomItem];
            return updated;
        });

        speak(randomItem, "default", 600);
    };

    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;
        refreshItem();
    }, []);

    const resetForm = () => {
        const form = formRef.current;
        if (!form) return;

        form.reset();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        if (!form) return;

        const formData = new FormData(form);
        let answer = formData.get("answer") as string;
        answer = answer.toLowerCase();

        if (!answer) return;

        checkAnswer(answer);
    };

    const checkAnswer = (answer: string) => {
        setCurrentTriesCount(currentTriesCount + 1);

        if (answer === currentItem) {
            handleCorrectAnswer();
        } else {
            handleUncorrectAnswer();
        }
    };

    const handleCorrectAnswer = () => {
        playSound("correct");
        if (dictationIndex !== maxIndex) {
            goToNextQuestion();
        } else {
            playSound("victory", 1000);
            computeGlobalErrors();
            navigate("/results");
        }
        resetForm();
    };

    const handleUncorrectAnswer = () => {
        playSound("error");
        setCurrentErrorCount(currentErrorCount + 1);
    };

    const goToNextQuestion = () => {
        computeGlobalErrors();
        setDictationIndex(dictationIndex + 1);
        refreshItem();
        setCurrentErrorCount(0);
        setCurrentTriesCount(0);
    };

    const computeGlobalErrors = () => {
        if (currentErrorCount) setGameErrorCount(gameErrorCount + 1);
    };

    return (
        <div className="w-full max-w-md p-4 h-full flex flex-col gap-8">
            <form
                className="flex flex-col justify-between h-full"
                onSubmit={handleSubmit}
                ref={formRef}
            >
                {/* Progress Bar */}
                <ProgressBar index={dictationIndex} max={maxIndex} />

                <div className="flex flex-col gap-3">
                    {/* Repeat buttons */}
                    <div className="flex gap-2">
                        <ListenButton item={currentItem} rate="default">
                            Listen again
                        </ListenButton>
                        <ListenButton item={currentItem} rate="slow">
                            Listen slower
                        </ListenButton>
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="font-pally text-lg font-medium text-base-900">
                            {question}
                        </p>
                        <GameInput gamemode={gamemode} />
                    </div>
                </div>

                <MainButton doSubmit={true}>Confirm!</MainButton>
            </form>
        </div>
    );
}
