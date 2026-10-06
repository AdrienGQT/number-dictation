import { useNavigate } from "react-router-dom";
import MainButton from "../components/MainButton";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-md p-4 h-full flex flex-col gap-8">
            <div className="flex flex-col justify-between h-full ">
                <div></div>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-0">
                        <p className="text-base-900 text-2xl font-pally font-bold text-center">
                            It's time for a
                        </p>
                        <h1 className="text-base-900 text-4xl font-pally font-extrabold text-center">
                            Number dictation!
                        </h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-base-900 text-lg font-pally text-center">
                            Your job is simple: listen carrefuly to the voice,
                            try to guess the number, write it and click
                            'Confirm'!
                        </h2>
                        <p className="text-base-900 text-lg font-pally text-center">
                            Click the 'Start' button when you feel ready.
                        </p>
                    </div>
                </div>

                <MainButton onClick={() => navigate("/game")}>
                    Start!
                </MainButton>
            </div>
        </div>
    );
}
