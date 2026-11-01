import type { ChangeEvent } from "react";
import { GAMEMODES, type Gamemode } from "../Pages/Home";

interface Props {
    gamemode: Gamemode;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function GameInput({ gamemode, onChange }: Props) {
    return (
        <input
            placeholder={gamemode === GAMEMODES[0] ? "00" : ""}
            name="answer"
            onChange={onChange}
            type={gamemode === GAMEMODES[0] ? "number" : "text"}
            required
            className="
                bg-base-050 text-base-900 border-transparent
                active:text-base-900 active:border-base-900  
                focus:text-base-900 focus:border-base-900
                placeholder:text-base-200
                font-pally text-8xl font-semibold text-center 
                rounded-lg tracking-wider border-4 px-3 py-2 
                drop-shadow-xs uppercase"
        />
    );
}
