import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Game from "./Pages/Game";
import Results from "./Pages/Results";

export default function App() {
    const RANGE = { min: 1, max: 99 };
    const MAX_INDEX = 3;

    return (
        <div className="bg-base-100 w-full h-dvh flex items-center justify-center">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/game"
                    element={<Game maxIndex={MAX_INDEX} range={RANGE} />}
                />
                <Route
                    path="/results"
                    element={<Results maxIndex={MAX_INDEX} />}
                />
            </Routes>
        </div>
    );
}
