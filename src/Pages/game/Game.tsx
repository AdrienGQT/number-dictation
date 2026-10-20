import { useEffect, useRef, useState } from "react";
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
}

export default function Game({ maxIndex, pool, question, gamemode }: props) {
    const navigate = useNavigate();

    const formRef = useRef<HTMLFormElement>(null);

    const initializedRef = useRef(false);

    const [pickedItems, setPickedItems] = useState<string[]>([]);
    const [currentItem, setCurrentItem] = useState<string | null>(null);
    const [dictationIndex, setDictationIndex] = useState<number>(1);

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

    // Reset form content
    const resetForm = () => {
        const form = formRef.current;
        if (!form) return;

        form.reset();
    };

    // Handle form sumbmit
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
        if (answer === currentItem) {
            handleCorrectAnswer();
        } else {
            handleUncorrectAnswer();
        }
    };

    // Handle correct answer
    const handleCorrectAnswer = () => {
        playSound("correct");
        if (dictationIndex !== maxIndex) {
            setDictationIndex(dictationIndex + 1);
            refreshItem();
        } else {
            playSound("victory", 1000);
            navigate("/results");
        }
        resetForm();
    };

    // Handle uncorrect answer
    const handleUncorrectAnswer = () => {
        playSound("error");
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
