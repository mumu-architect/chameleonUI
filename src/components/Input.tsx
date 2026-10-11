import {ComponentProps} from "solid-js";
import * as Input from "@solidiom/input";



export type InputColor = "blue" | "green" | "yellow" | "gray" | "red";

export type UiInputProps = ComponentProps<typeof Input.Root> & {
    color?: InputColor;
};

const colorClassMap: Record<InputColor, string> = {
    blue: "border-blue-300 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300",
    green: "border-green-300 focus:ring-emerald-500 focus:border-emerald-500 hover:border-emerald-300 ",
    yellow: "border-yellow-300 focus:ring-amber-500 focus:border-amber-500 hover:border-amber-300 ",
    gray: "border-gray-300 focus:ring-slate-500 focus:border-slate-500 hover:border-slate-300 ",
    red: "border-red-300 focus:ring-red-500 focus:border-red-500 hover:border-red-300 ",
};
export function Q_Input(props: UiInputProps) {
    const { color = "blue", class: className, ...rest } = props;

    const baseClass = [
        "h-9 w-full rounded-md border  bg-white px-3 py-1.5 text-sm transition-colors placeholder:text-gray-400 outline-hidden focus:outline-none focus:ring-1 ",
        colorClassMap[color],
        "aria-invalid:border-red-500 aria-invalid:ring-red-500 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500",
        "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
    ].join(" ");

    // 合并基础class + 外部传入className
    const finalClass = className ? `${baseClass} ${className}` : baseClass;

    return (
        <Input.Root
            {...rest}
            class={finalClass}
        />
    );
}