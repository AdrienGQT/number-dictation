import { useNavigate } from "react-router-dom";
import MainButton from "../components/MainButton";

interface props {
    maxIndex: number;
}

export default function Results({ maxIndex }: props) {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-md p-4 h-full flex flex-col gap-8">
            <div className="flex flex-col justify-between h-full">
                <div></div>
                <div className="flex flex-col gap-4">
                    <p className="text-base-900 text-2xl font-pally font-bold text-center">
                        Congratulations!
                    </p>
                    <p className="text-base-900 text-lg font-pally text-center">
                        You did very well for this serie of {maxIndex}! Go to
                        homepage by clicking the button below and start a new
                        game.
                    </p>
                </div>

                <MainButton onClick={() => navigate("/")}>
                    Go to homepage
                </MainButton>
            </div>
        </div>
    );
}
