import { Component } from "solid-js";
import * as NumberInput from "@solidiom/number-input"

export interface QNumberInputProps {
    /** 默认值（非受控） */
    defaultValue?: number;
    /** 当前值（受控模式） */
    value?: number;
    /** 数值最小值 */
    min?: number;
    /** 数值最大值 */
    max?: number;
    /** 步长 */
    step?: number;
    /** 数值变更回调 */
    onValueChange?: (val: number) => void;
    /** 是否禁用 */
    disabled?: boolean;
    /** 组件外层class */
    class?: string;
    /** 输入框宽度，默认 w-[220px] */
    width?: string;
    color?:InputColor;
}
type InputColor = "blue" | "green" | "yellow" | "gray" | "red";
const ColorClassMap:Record<InputColor, string>={
    blue: " border-blue-300 ",
    green: " border-green-300  ",
    yellow: " border-yellow-300 ",
    gray: " border-gray-300 ",
    red: "border-red-300 ",

}
const ColorClassMapOption:Record<InputColor, string>={
    blue: " bg-blue-200 hover:bg-blue-200 active:bg-blue-300  focus:ring-blue-500",
    green: " bg-green-200 hover:bg-green-200 active:bg-green-300  focus:ring-green-500 ",
    yellow: " bg-yellow-200 hover:bg-yellow-200 active:bg-yellow-300 focus:ring-yellow-500 ",
    gray: " bg-gray-200 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-500 ",
    red: " bg-red-200 hover:bg-red-200 active:bg-red-300 focus:ring-red-500 ",
}
const Q_NumberInput: Component<QNumberInputProps> = (props) => {
    let ColorName = props?.color?props.color:"blue"
    let baseColor=ColorClassMap[ColorName]
    let baseColorOption=ColorClassMapOption[ColorName]
    return (
        <NumberInput.Root
            defaultValue={props.defaultValue}
            value={props.value}
            min={props.min}
            max={props.max}
            step={props.step ?? 1}
            onValueChange={props.onValueChange}
            disabled={props.disabled}
            class={`
        flex items-stretch overflow-hidden rounded-lg border  font-sans text-sm h-10
        ${baseColor} 
        ${props.width ?? "w-[220px]"}
        ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${props.class ?? ""}
      `}
        >
            <NumberInput.DecrementButton
                class={`${baseColorOption} w-12 border-none text-gray-800 text-lg transition-colors  cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-blue-100 focus:outline-none`}
            >
                −
            </NumberInput.DecrementButton>

            <NumberInput.Input
                class="flex-1 border-none px-0 text-center outline-none focus:ring-0 focus:border-none bg-transparent disabled:bg-gray-100"
            />

            <NumberInput.IncrementButton
                class={`${baseColorOption}  w-12 border-none text-gray-800 text-lg transition-colors  cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-blue-100 focus:outline-none `}
            >
                +
            </NumberInput.IncrementButton>
        </NumberInput.Root>
    );
};

export default Q_NumberInput;
