import type { ReactNode } from "react";

interface props {
    state?: "default" | "selected";
    onClick?: () => void;
    children: ReactNode;
}

export default function SwitchOption({
    state = "default",
    onClick,
    children,
}: props) {
    const BASE_STYLE =
        "w-full font-pally font-semibold px-3 py-2 rounded-lg text-lg drop-shadow-xs cursor-pointer text-center transition-colors duration-200 ease-playful";
    const DEFAULT_STYLE = "text-base-200 hover:bg-base-100";
    const SELECTED_STYLE = "text-base-050";

    return (
        <button
            onClick={onClick}
            aria-pressed={state === "selected"}
            className={`${BASE_STYLE} ${state === "selected" ? SELECTED_STYLE : DEFAULT_STYLE}`}
        >
            {children}
        </button>
    );
}
