import Game from "./Game";
import type { Gamemode } from "../Home";

interface Props {
    maxIndex: number;
    range: { min: number; max: number };
    gamemode: Gamemode;
}

export default function NumberGame({ maxIndex, range, gamemode }: Props) {
    const pool = Array.from({ length: range.max - range.min + 1 }, (_, i) =>
        (i + range.min).toString(),
    );

    return (
        <Game
            maxIndex={maxIndex}
            pool={pool}
            gamemode={gamemode}
            question="What number do you hear?"
        />
    );
}
