import { useNavigate } from "react-router-dom";
import MainButton from "../components/MainButton";
import type { Dispatch } from "react";

interface props {
    maxIndex: number;
    gameErrorCount: number;
    setGameErrorCount: Dispatch<React.SetStateAction<number>>;
}

export default function Results({
    maxIndex,
    gameErrorCount,
    setGameErrorCount,
}: props) {
    const navigate = useNavigate();

    const endGame = () => {
        setGameErrorCount(0);
        navigate("/");
    };

    return (
        <div className="w-full max-w-md p-4 h-full flex flex-col gap-8">
            <div className="flex flex-col justify-between h-full">
                <div></div>
                <div className="flex flex-col gap-4">
                    <p className="text-base-900 text-2xl font-pally font-bold text-center">
                        Congratulations!
                    </p>
                    <p className="text-base-900 text-lg font-pally text-center">
                        You answered correctly to {maxIndex - gameErrorCount} questions out of {maxIndex}!
                    </p>
                    <p className="text-base-900 text-lg font-pally text-center">
                        Go to homepage by clicking the button below and start a
                        new game.
                    </p>
                </div>

                <MainButton onClick={() => endGame()}>
                    Go to homepage
                </MainButton>
            </div>
        </div>
    );
}
