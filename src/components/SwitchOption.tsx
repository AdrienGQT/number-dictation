import type { ReactNode } from "react";

interface props {
    state?: string;
    onClick?: () => void;
    children: ReactNode;
}

export default function SwitchOption({ state = "default", onClick, children }: props) {
    const BASE_STYLE =
        "w-full font-pally font-semibold pl-3 pr-3 pt-2 pb-2 rounded-lg text-lg drop-shadow-xs cursor-pointer text-center ";
    const DEFAULT_STYLE = "text-base-200 hover:bg-base-100 ";
    const SELECTED_STYLE = "bg-forest-500 text-base-050";
    return (
        <div
            onClick={onClick}
            className={
                BASE_STYLE +
                (state === "default" ? DEFAULT_STYLE : SELECTED_STYLE)
            }
        >
            {children}
        </div>
    );
}
