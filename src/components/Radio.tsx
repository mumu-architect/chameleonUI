import {For} from "solid-js";
import * as RadioGroup from "@solidiom/radio-group"

type RadioOption = {
    value: string;
    label: string;
};
type InputColor = "blue" | "green" | "yellow" | "gray" | "red";
interface RadioGroupProps {
    // 选中值，可选
    value?: any;
    onValueChange: (val: any) => void;
    options: RadioOption[];
    color?: InputColor;
}
const ColorClassMap:Record<InputColor, string>={
    blue: " bg-blue-500 ",
    green: " bg-green-500  ",
    yellow: " bg-yellow-500 ",
    gray: " bg-gray-500 ",
    red: " bg-red-500 ",
}
export function Q_RadioGroup(props: RadioGroupProps) {
    let ColorName = props?.color?props.color:"blue"
    let baseColor=ColorClassMap[ColorName]

    return (
        <RadioGroup.Root
            // 传 getter accessor，处理 undefined 默认空字符串
            value={() => props.value ?? ""}
            onValueChange={props.onValueChange}
            class="flex flex-row flex-newline gap-4 py-2"
        >
            <For each={props.options}>
                {(item) => (
                    <RadioGroup.Item
                        value={item.value}
                        class="flex items-center gap-2 cursor-pointer select-none shrink-0"
                    >
                        {/* 外圆 */}
                        <span class="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center shrink-0">
              {/* 内圆点 */}
                            <span
                                class={
                                    props.value === item.value
                                        ? `${baseColor} w-2 h-2 rounded-full `
                                        : "hidden"
                                }
                            />
            </span>
                        <span class="text-sm text-gray-800 whitespace-nowrap">
              {item.label}
            </span>
                    </RadioGroup.Item>
                )}
            </For>
        </RadioGroup.Root>
    );
}