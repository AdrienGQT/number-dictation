import type { MouseEvent, ReactNode } from "react";

interface props {
    doSubmit?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    children: ReactNode;
}

export default function MainButton({
    doSubmit = false,
    onClick,
    disabled = false,
    children,
}: props) {
    return (
        <button
            type={doSubmit ? "submit" : "button"}
            onClick={onClick}
            disabled={disabled}
            className="
                bg-ocean-500 border-transparent text-base-050 
                hover:bg-ocean-500 hover:border-ocean-400 
                disabled:bg-base-200 disabled:border-transparent disabled:text-base-050
                text-lg font-pally font-semibold 
                px-3 py-2 border-4 rounded-lg 
                drop-shadow-xs 
                cursor-pointer"
        >
            {children}
        </button>
    );
}
