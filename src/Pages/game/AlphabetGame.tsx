import type { Dispatch } from "react";
import type { Gamemode } from "../Home";
import Game from "./Game";

interface Props {
    maxIndex: number;
    gamemode: Gamemode;
    gameErrorCount: number;
    setGameErrorCount: Dispatch<React.SetStateAction<number>>;
}

export default function AlphabetGame({
    maxIndex,
    gamemode,
    gameErrorCount,
    setGameErrorCount,
}: Props) {
    const pool = "abcdefghijklmnopqrstuvwxyz".split("");
    console.log(pool);

    return (
        <Game
            maxIndex={maxIndex}
            pool={pool}
            gamemode={gamemode}
            gameErrorCount={gameErrorCount}
            setGameErrorCount={setGameErrorCount}
            question="What letter do you hear?"
        />
    );
}
