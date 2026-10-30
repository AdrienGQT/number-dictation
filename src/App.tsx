import { Route, Routes } from "react-router-dom";
import Home, { GAMEMODES } from "./Pages/Home";
import Results from "./Pages/Results";
import NumberGame from "./Pages/game/NumberGame";
import AlphabetGame from "./Pages/game/AlphabetGame";
import { useState } from "react";

export default function App() {
    const RANGE = { min: 1, max: 99 };
    const MAX_INDEX = 20;

    const [gameErrorCount, setGameErrorCount] = useState<number>(0);

    return (
        <div className="bg-base-100 w-full h-dvh flex items-center justify-center">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/game/numbers"
                    element={
                        <NumberGame
                            maxIndex={MAX_INDEX}
                            range={RANGE}
                            gamemode={GAMEMODES[0]}
                            gameErrorCount={gameErrorCount}
                            setGameErrorCount={setGameErrorCount}
                        />
                    }
                />
                <Route
                    path="/game/alphabet"
                    element={
                        <AlphabetGame
                            maxIndex={MAX_INDEX}
                            gamemode={GAMEMODES[1]}
                            gameErrorCount={gameErrorCount}
                            setGameErrorCount={setGameErrorCount}
                        />
                    }
                />
                <Route
                    path="/results"
                    element={
                        <Results
                            maxIndex={MAX_INDEX}
                            gameErrorCount={gameErrorCount}
                            setGameErrorCount={setGameErrorCount}
                        />
                    }
                />
            </Routes>
        </div>
    );
}
