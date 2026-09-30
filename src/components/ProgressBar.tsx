import { useEffect, useRef } from "react";

interface props {
    index: number;
    max: number;
}

export default function ProgressBar({ index, max }: props) {
    const progressBarRef = useRef(null);

    useEffect(() => {
        if (!progressBarRef.current) return;

        const progressBar = progressBarRef.current as HTMLElement;
        const width = `${((index - 1) / (max + 0)) * 100}%`;
        progressBar.style.width = width;
    }, [index, max]);
    return (
        <div className="flex flex-col gap-1">
            <span className="font-pally text-lg font-semibold text-base-900">
                Number {index}
                <span className="text-base-200 font-medium"> out of {max}</span>
            </span>

            <div className="w-full h-3 bg-base-050 rounded-xl flex drop-shadow-xs overflow-hidden">
                <div
                    ref={progressBarRef}
                    className="bg-forest-500 rounded-xl min-w-3"
                ></div>
            </div>
        </div>
    );
}
