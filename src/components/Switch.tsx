import { useState } from "react";
import SwitchOption from "./SwitchOption";

interface props {
    firstOption: string;
    secondOption: string;
    defaultValue?: string;
    onChange?: (selectedOption: string) => void;
}

export default function Switch({
    firstOption,
    secondOption,
    defaultValue = firstOption,
    onChange,
}: props) {
    const [selected, setSelected] = useState<string>(defaultValue);

    const handleSelect = (option: string) => {
        setSelected(option);
        onChange?.(option);
    };

    const isSecondOptionSelected = selected === secondOption;

    return (
        <div className="w-full p-1 bg-base-050 flex rounded-xl gap-1 relative">
            <div
                className="
                        absolute top-1 left-1
                        w-[calc(50%-6px)]
                        h-[calc(100%-8px)]
                        rounded-lg bg-forest-500
                        transition-left duration-200 ease-playful
                    "
                style={{ left: isSecondOptionSelected ? "calc(50% + 2px)" : "4px" }}
            ></div>
            <SwitchOption
                state={selected === firstOption ? "selected" : "default"}
                onClick={() => {
                    handleSelect(firstOption);
                }}
            >
                {firstOption}
            </SwitchOption>
            <SwitchOption
                state={selected === secondOption ? "selected" : "default"}
                onClick={() => {
                    handleSelect(secondOption);
                }}
            >
                {secondOption}
            </SwitchOption>
        </div>
    );
}
