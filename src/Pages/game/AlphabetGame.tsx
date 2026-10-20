import type { Gamemode } from "../Home";
import Game from "./Game";

interface Props {
    maxIndex: number;
    gamemode: Gamemode;
}

export default function AlphabetGame({ maxIndex, gamemode }: Props) {
    const pool = "abcdefghijklmnopqrstuvwxyz".split("");
    console.log(pool);

    return (
        <Game
            maxIndex={maxIndex}
            pool={pool}
            gamemode={gamemode}
            question="What letter do you hear?"
        />
    );
}
