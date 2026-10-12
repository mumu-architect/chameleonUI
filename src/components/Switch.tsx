import { createSignal, Component } from "solid-js";
import * as Switch from "@solidiom/switch"
import {JSX} from "@solidjs/web";

export interface SwitchProps {
    /** 选中状态 */
    checked: boolean;
    /** 状态变更回调 */
    onCheckedChange: (value: boolean) => void;
    /** 是否禁用 */
    disabled?: boolean;
    /** 外层class */
    class?: string;
    /** 开关label文本，或者插槽 */
    children?: JSX.Element | string;
    color?:InputColor;
}
type InputColor = "blue" | "green" | "yellow" | "gray" | "red";
const ColorClassMap:Record<InputColor, string>={
    blue: " bg-blue-500  focus:outline-none focus:ring-2 focus:ring-blue-400 ",
    green: " bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400  ",
    yellow: " bg-yellow-500  focus:outline-none focus:ring-2 focus:ring-yellow-400 ",
    gray: " bg-gray-500  focus:outline-none focus:ring-2 focus:ring-gray-400 ",
    red: " bg-red-500  focus:outline-none focus:ring-2 focus:ring-red-400 ",
}
const ColorClassMapOption:Record<InputColor, string>={
    blue: " bg-blue-300 ",
    green: " bg-green-300  ",
    yellow: " bg-yellow-300 ",
    gray: " bg-gray-300 ",
    red: " bg-red-300 ",
}
const Q_Switch: Component<SwitchProps> = (props) => {
    let ColorName = props?.color?props.color:"blue"
    let baseColor=ColorClassMap[ColorName]
    let baseColorOption=ColorClassMapOption[ColorName]
    return (
        <div class="inline-flex items-center gap-2 ">
            <Switch.Root
                defaultChecked={props.checked}
                onCheckedChange={props.onCheckedChange}
                disabled={props.disabled}
                class={`
          w-12 h-7 rounded-full relative cursor-pointer transition-colors duration-200 
          ${props.checked ? `${baseColor}  `: "bg-gray-300 "}
          ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${props.class ?? ""}
        `}
            >
                <Switch.Thumb
                    class={`
            w-6 h-6 rounded-full ${baseColorOption}  absolute top-0.5 left-0.5 shadow-md transition-transform duration-200
            ${props.checked ? "translate-x-5" : "translate-x-0"}
          `}
                />
            </Switch.Root>
            {props.children && <span>{props.children}</span>}
        </div>
    );
};


export default Q_Switch;
