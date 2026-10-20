import { GAMEMODES, type Gamemode } from "../Pages/Home";

interface Props {
    gamemode: Gamemode;
}

export default function GameInput({ gamemode }: Props) {
    return (
        <input
            placeholder={gamemode === GAMEMODES[0] ? "00" : ""}
            name="answer"
            type={gamemode === GAMEMODES[0] ? "number" : "text"}
            required
            className="bg-base-050 font-pally font-semibold rounded-lg text-8xl text-center tracking-wider text-base-900 active:text-base-900 focus:text-base-900 border-4 border-transparent active:border-base-900 focus:border-base-900 placeholder:text-base-200 pl-3 pr-3 pt-2 pb-2 drop-shadow-xs uppercase"
        />
    );
}
