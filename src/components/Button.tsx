// UiButton.tsx
import * as Button from "@solidiom/button";
import {JSX} from "@solidjs/web";

export type UiButtonProps = {
    children: JSX.Element;
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "danger" | "yellow" | "ghost";
};

export function Q_Button(props: UiButtonProps) {
    const base = "px-4 py-2 rounded transition-colors disabled:opacity-60 border";

    const getVariantClass = () => {
        switch (props.variant) {
            // secondary 修改为绿色填充+同色系边框
            case "secondary":
                return "bg-green-500 text-white border-green-600 hover:bg-green-600 active:bg-green-700";
            case "danger":
                return "bg-red-500 text-white border-red-600 hover:bg-red-600 active:bg-red-700";
            case "ghost":
                return "border-gray-300 text-gray-700 hover:bg-gray-100";
            case "yellow":
                return "bg-amber-400 text-amber-950 border border-amber-500 hover:bg-amber-300 active:bg-amber-500 active:text-white";
            case "primary":
            default:
                return "bg-blue-600 text-white border-blue-700 hover:bg-blue-700 active:bg-blue-800";
        }
    };
    return (
        <Button.Root
            onClick={props.onClick}
            loading={props.loading}
            disabled={props.disabled}
            class={`${base} ${getVariantClass()}`}
        >
            {props.children}
        </Button.Root>
    );
}
