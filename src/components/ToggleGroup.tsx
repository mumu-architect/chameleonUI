import * as ToggleGroup from "@solidiom/toggle-group"
import {JSX} from "@solidjs/web";


type ToggleItem = {
    value: string;
    label: JSX.Element;
};

interface ToggleGroupProps {
    type: "single" | "multiple";
    defaultValue?: string[];
    items: ToggleItem[];
    onValueChange?: (values: string[]) => void;
    color?:InputColor;
}
type InputColor = "blue" | "green" | "yellow" | "gray" | "red";
// const ColorClassMap:Record<InputColor, string>={
//     blue: " bg-blue-500  focus:outline-none focus:ring-2 focus:ring-blue-400 ",
//     green: " bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400  ",
//     yellow: " bg-yellow-500  focus:outline-none focus:ring-2 focus:ring-yellow-400 ",
//     gray: " bg-gray-500  focus:outline-none focus:ring-2 focus:ring-gray-400 ",
//     red: " bg-red-500  focus:outline-none focus:ring-2 focus:ring-red-400 ",
// }
const ColorClassMapOption:Record<InputColor, string>={
    blue: " hover:bg-blue-100 data-[state=on]:bg-blue-500 ",
    green: " hover:bg-green-100 data-[state=on]:bg-green-500  ",
    yellow: " hover:bg-yellow-100 data-[state=on]:bg-yellow-500 ",
    gray: " hover:bg-gray-100 data-[state=on]:bg-gray-500 ",
    red: " hover:bg-red-100 data-[state=on]:bg-red-500 ",
}
export function Q_ToggleGroup(props: ToggleGroupProps) {
    let ColorName = props?.color?props.color:"blue"
   // let baseColor=ColorClassMap[ColorName]
    let baseColorOption=ColorClassMapOption[ColorName]
    return (
        <ToggleGroup.Root
            type={props.type}
            defaultValue={props.defaultValue}
            onValueChange={props.onValueChange}
            class="inline-flex gap-1 p-1 border border-gray-300 rounded-md bg-white"
        >
            {props.items.map((item) => (
                <ToggleGroup.Item
                    value={item.value}
                    class={`px-3 py-1.5 rounded  ${baseColorOption} data-[state=on]:text-white transition-colors`}
                >
                    {item.label}
                </ToggleGroup.Item>
            ))}
        </ToggleGroup.Root>
    );
}