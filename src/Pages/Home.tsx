import { useNavigate } from "react-router-dom";
import MainButton from "../components/MainButton";
import Switch from "../components/Switch";
import { useState } from "react";

export type Gamemode = "Numbers" | "Alphabet";
export const GAMEMODES: Gamemode[] = ["Numbers", "Alphabet"];

export default function Home() {
    const navigate = useNavigate();
    const [selectedMode, setSelectedMode] = useState<Gamemode>(GAMEMODES[0]);

    return (
        <div className="w-full max-w-md p-4 h-full flex flex-col gap-8">
            <div className="flex flex-col justify-between h-full ">
                <div></div>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-0">
                        <p className="text-base-900 text-2xl font-pally font-bold text-center">
                            It's time for a
                        </p>
                        <h1 className="text-base-900 text-6xl font-pally font-extrabold text-center">
                            Dictation!
                        </h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-base-900 text-lg font-pally text-center">
                            Your job is simple: listen carefuly to the voice,
                            try to guess what is said, write it and click
                            'Confirm'!
                        </h2>
                        <p className="text-base-900 text-lg font-pally text-center">
                            Click the 'Start' button when you feel ready.
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-pally text-lg font-medium text-base-900">
                            Select a gamemode:
                        </p>
                        <Switch
                            firstOption={GAMEMODES[0]}
                            secondOption={GAMEMODES[1]}
                            defaultValue={GAMEMODES[0]}
                            onChange={(option) =>
                                setSelectedMode(option as Gamemode)
                            }
                        ></Switch>
                    </div>
                </div>

                <MainButton
                    onClick={() =>
                        navigate(
                            `${selectedMode === GAMEMODES[0] ? "/game/numbers" : "/game/alphabet"}`,
                        )
                    }
                >
                    Start!
                </MainButton>
            </div>
        </div>
    );
}
