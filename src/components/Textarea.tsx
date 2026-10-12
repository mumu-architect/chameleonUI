import {Component, createSignal, ParentProps} from "solid-js";
import * as Textarea from "@solidiom/textarea";

export interface QTextareaProps {
    /** 默认值（非受控） */
    defaultValue?: string;
    /** 受控值 */
    value?: string;
    /** 值变更回调 */
    onChange?: (value: string) => void;
    /** aria标签 */
    ariaLabel?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 外层自定义class */
    class?: string;
    /** 占位文本 */
    placeholder?: string;
    /** 最小高度，默认 min-h-32 */
    minH?: string;
    /** 最大高度，默认 max-h-64 */
    maxH?: string;
    color?:InputColor;
}
type InputColor = "blue" | "green" | "yellow" | "gray" | "red";
const ColorClassMap:Record<InputColor, string>={
    blue: " focus:border-blue-500 focus:ring-2 focus:ring-blue-200  ",
    green: " focus:border-green-500 focus:ring-2 focus:ring-green-200   ",
    yellow: " focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200  ",
    gray: " focus:border-gray-500 focus:ring-2 focus:ring-gray-200  ",
    red: " focus:border-red-500 focus:ring-2 focus:ring-red-200  ",

}
// const ColorClassMapOption:Record<InputColor, string>={
//     blue: " bg-blue-200 hover:bg-blue-200 active:bg-blue-300  focus:ring-blue-500",
//     green: " bg-green-200 hover:bg-green-200 active:bg-green-300  focus:ring-green-500 ",
//     yellow: " bg-yellow-200 hover:bg-yellow-200 active:bg-yellow-300 focus:ring-yellow-500 ",
//     gray: " bg-gray-200 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-500 ",
//     red: " bg-red-200 hover:bg-red-200 active:bg-red-300 focus:ring-red-500 ",
// }
const Q_Textarea: Component<QTextareaProps> = (props) => {
    let ColorName = props?.color?props.color:"blue"
    let baseColor=ColorClassMap[ColorName]
   // let baseColorOption=ColorClassMapOption[ColorName]
    return (
        <Textarea.Root
            aria-label={props.ariaLabel ?? "Message"}
            defaultValue={props.defaultValue}
            value={props.value}
            disabled={props.disabled}
            placeholder={props.placeholder}
            onChange={(e) => props.onChange?.(e.target.value)}
            class={`
        w-full ${props.minH ?? "min-h-32"} ${props.maxH ?? "max-h-64"} resize-y
        px-4 py-3
        border border-gray-300 rounded-xl
        bg-gray-50 text-gray-800
        text-base leading-relaxed
        outline-none
        ${baseColor}
        hover:border-gray-400 hover:bg-white
        focus:bg-white
        disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
        ${props.class ?? ""}
      `}
        />
    );
};

export default Q_Textarea;
