import { useEffect, useRef, useState } from "react";
import speak from "../tools/speak";
import playSound from "../tools/playSound";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import ListenButton from "../components/ListenButton";
import NumberInput from "../components/NumberInput";
import MainButton from "../components/MainButton";

interface props {
    maxIndex: number;
    range: { min: number; max: number };
}

export default function Game({ maxIndex, range }: props) {
    const navigate = useNavigate();

    const formRef = useRef<HTMLFormElement>(null);

    const initializedRef = useRef(false);

    const [pickedNumbers, setPickedNumbers] = useState<number[]>([]);
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);
    const [dictationIndex, setDictationIndex] = useState<number>(1);

    const refreshNumber = () => {
        console.log("refreshNumber");
        const totalPool = Array.from(
            { length: range.max - range.min + 1 },
            (_, i) => i + range.min,
        );

        const remaining = totalPool.filter(
            (num) => !pickedNumbers.includes(num),
        );

        if (remaining.length === 0) return;

        const randomIndex = Math.floor(Math.random() * remaining.length);
        const randomNumber = remaining[randomIndex];

        setCurrentNumber(randomNumber);
        setPickedNumbers((prev) => {
            const updated = [...prev, randomNumber];
            return updated;
        });

        speak(randomNumber, "default", 600);
    };

    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;

        console.log("useEffect");
        refreshNumber();
    }, []);

    // Reset form content
    const resetForm = () => {
        const form = formRef.current;
        if (!form) return;

        form.reset();
    };

    // Handle correct answer
    const handleCorrectAnswer = () => {
        playSound("correct");
        if (dictationIndex !== maxIndex) {
            setDictationIndex(dictationIndex + 1);
            refreshNumber();
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

    const checkAnswer = (answer: number) => {
        if (answer === currentNumber) {
            handleCorrectAnswer();
        } else {
            handleUncorrectAnswer();
        }
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
                        <ListenButton number={currentNumber} rate="default">
                            Listen again
                        </ListenButton>
                        <ListenButton number={currentNumber} rate="slow">
                            Listen slower
                        </ListenButton>
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="font-pally text-lg font-medium text-base-900">
                            What number do you hear?
                        </p>
                        <NumberInput />
                    </div>
                </div>

                <MainButton doSubmit={true}>Confirm!</MainButton>
            </form>
        </div>
    );
}
