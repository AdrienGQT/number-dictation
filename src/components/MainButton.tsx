import type { ReactNode } from "react";

interface props {
    doSubmit?: boolean;
    onClick?: Function;
    children: ReactNode;
}

export default function MainButton({
    doSubmit = false,
    onClick,
    children,
}: props) {
    return (
        <button
            type={doSubmit ? "submit" : undefined}
            onClick={
                onClick
                    ? () => {
                          onClick();
                      }
                    : undefined
            }
            className="bg-forest-500 font-pally font-semibold pl-3 pr-3 pt-2 pb-2 rounded-lg text-lg text-base-050 border-4 border-transparent hover:border-forest-400 drop-shadow-xs cursor-pointer"
        >
            {children}
        </button>
    );
}
