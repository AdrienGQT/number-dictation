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

    return (
        <div className="w-full p-1 bg-base-050 flex rounded-xl gap-1">
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
