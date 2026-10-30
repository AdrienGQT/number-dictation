import Game from "./Game";
import type { Gamemode } from "../Home";
import type { Dispatch } from "react";

interface Props {
    maxIndex: number;
    range: { min: number; max: number };
    gamemode: Gamemode;
    gameErrorCount: number;
    setGameErrorCount: Dispatch<React.SetStateAction<number>>;
}

export default function NumberGame({
    maxIndex,
    range,
    gamemode,
    gameErrorCount,
    setGameErrorCount,
}: Props) {
    const pool = Array.from({ length: range.max - range.min + 1 }, (_, i) =>
        (i + range.min).toString(),
    );

    return (
        <Game
            maxIndex={maxIndex}
            pool={pool}
            gamemode={gamemode}
            gameErrorCount={gameErrorCount}
            setGameErrorCount={setGameErrorCount}
            question="What number do you hear?"
        />
    );
}
