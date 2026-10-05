import type { ReactNode } from "react";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import HearingRoundedIcon from "@mui/icons-material/HearingRounded";
import speak, { type SpeechRateType } from "../tools/speak";

interface props {
    children: ReactNode;
    number: number | null;
    rate?: SpeechRateType;
}

export default function ListenButton({ children, number, rate }: props) {
    const BASE_STYLE =
        "pl-3 pr-3 pt-2 pb-2 font-pally text-lg font-medium rounded-lg cursor-pointer flex flex-col items-center gap-2 drop-shadow-xs";
    const DEFAULT_STYLE = "bg-base-050 text-base-900 w-full";
    const SLOW_STYLE = "bg-base-200 text-base-900 w-full";
    return (
        <button
            className={
                rate === "default"
                    ? BASE_STYLE + " " + DEFAULT_STYLE
                    : BASE_STYLE + " " + SLOW_STYLE
            }
            onClick={() => {
                speak(number, rate);
            }}
            type="button"
        >
            {rate === "default" ? (
                <VolumeUpRoundedIcon className="w-14! h-14!" />
            ) : (
                <HearingRoundedIcon className="w-14! h-14!" />
            )}

            {children}
        </button>
    );
}
